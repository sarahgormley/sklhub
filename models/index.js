const User = require('./User');
const Job = require('./Job');

User.hasMany(Job, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Job.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Job };