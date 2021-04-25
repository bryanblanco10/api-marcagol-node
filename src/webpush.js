const webpush = require('web-push')

webpush.setVapidDetails(
	process.env.VAPID_SUBJECT,
	process.env.PUBLIC_VAPID_KEY,
	process.env.PRIVATE_VAPID_KEY
)

module.exports = webpush
