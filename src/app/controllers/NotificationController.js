import Notification from '../schemas/notification';
import User from '../models/User';

class NotificationController {
  async index(req, res) {
    const chekIsProvider = await User.findOne({
      where: { id: req.userId, provider: true }
    });

    if (!chekIsProvider) {
      return res
        .status(401)
        .json({ error: 'You can only create appointment with providers' });
    }

    const notification = await Notification.find({
      user: req.userId
    })
      .sort({ createdAt: 'desc' })
      .limit(20);

    return res.json(notification);
  }

  async update(req, res) {
    // const notification = await Notifications.findById(req.params.id);

    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );

    return res.json(notification);
  }
}

export default new NotificationController();
