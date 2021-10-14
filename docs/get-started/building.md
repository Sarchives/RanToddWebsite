# Get started (Building the website)

1. Clone this repository.
2. After cloning, add a file called `.env.production`, then add an environment variable named `GATSBY_API_URL` with a value of your API URL you configured on the bot.
   
   The resulting `.env.production` file might look like this:
   ```
   GATSBY_API_URL=<insert url for api here>
   ```
3. Open a command line window and `cd` to Website. Make sure that `package.json` exists in the selected folder.
4. Execute `gatsby build` and wait for the build to finish.

Now you will find the built webpage in public!
