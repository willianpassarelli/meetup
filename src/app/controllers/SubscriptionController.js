import { Op } from 'sequelize';
import { isBefore } from 'date-fns';

import Subscription from '../models/Subscription';
import User from '../models/User';
import File from '../models/File';
import Meetup from '../models/Meetup';
import Queue from '../../lib/Queue';
import SubscriptionMail from '../jobs/SubscriptionMail';

class SubscriptionController {
  async index(req, res) {
    const subscriptions = await Subscription.findAll({
      where: {
        user_id: req.userId,
      },
      include: [
        {
          model: Meetup,
          as: 'meetup',
          attributes: [
            'id',
            'past',
            'title',
            'location',
            'description',
            'date',
          ],
          include: [
            {
              model: File,
              as: 'banner',
              attributes: ['path', 'url'],
            },
            {
              model: User,
              as: 'user',
              attributes: ['id', 'name'],
            },
          ],
          where: {
            date: {
              [Op.gt]: new Date(),
            },
          },
          order: ['date'],
        },
      ],
    });

    return res.json(subscriptions);
  }

  async store(req, res) {
    const user = await User.findByPk(req.userId);
    const meetup = await Meetup.findByPk(req.params.meetupId, {
      include: [
        {
          model: User,
          as: 'user',
        },
        {
          model: File,
          as: 'banner',
        },
      ],
    });

    if (meetup.user_id === req.userId) {
      return res
        .status(400)
        .json({ error: "Can't subscribe to you own meetups" });
    }

    if (meetup.past) {
      return res.status(400).json({ error: "Can't subscribe to past meetups" });
    }

    const checkDate = await Subscription.findOne({
      where: {
        user_id: user.id,
      },
      include: [
        {
          model: Meetup,
          as: 'meetup',
          required: true,
          where: {
            date: meetup.date,
          },
        },
      ],
    });

    if (checkDate) {
      return res
        .status(400)
        .json({ error: "Can't subscribe to two meetups at the same time" });
    }

    const subscription = await Subscription.create({
      user_id: user.id,
      meetup_id: meetup.id,
      file_id: meetup.file_id,
    });

    await Queue.add(SubscriptionMail.key, {
      meetup,
      user,
    });

    return res.json(subscription);
  }

  async delete(req, res) {
    const subscriptions = await Subscription.findByPk(
      req.params.subscriptionId,
      {
        include: [
          {
            model: Meetup,
            as: 'meetup',
            attributes: ['id', 'date'],
          },
        ],
      }
    );

    if (subscriptions.user_id !== req.userId) {
      return res
        .status(401)
        .json({ error: "You don't have permission to cancel Meetup" });
    }

    if (isBefore(subscriptions.meetup.date, new Date())) {
      return res
        .status(400)
        .json({ error: 'Unable to cancel a meetup that already happened' });
    }

    subscriptions.destroy();

    return res.json(subscriptions);
  }
}
export default new SubscriptionController();
