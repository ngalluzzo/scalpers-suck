# scalpers-suck
Don't let these fools sucker you out of your precious new GPU - If you can't beat em, join em!

# About

Checks GPU stock status every 60 seconds using the NVIDIA API and sends a notification via Pushbullet when a GPU is in stock

I still have some ethics in me (aka I'm a noob) so this won't buy it automatically :)

# Usage
Requires a [Pushbullet account](https://pushbullet.com)

1. Run `npm install` in the terminal to install dependencies
2. Start the script

# Env Variables
`PUSHBULLET_API_KEY` Your pushbullet API key
`DEVICE_ID` The pushbullet device ID that will receive the notification

