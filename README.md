# The Comments Problem 💬

GitHub has [neat statistics](https://github.com/facebook/react/graphs/contributors) for contributors, it shows number of commits and nice charts. But people contribute to GitHub projects not only via commits. Actually, a lot of contributions happens in issue or pull request comments 💬. GitHub doesn't have statistics to show "top commenters". We think those people also deserve recognition.

The median time to complete this task is ~3 hours, but we don't impose any limits. Just let us know when you are done. 

## Task

You would need to fetch all existing comments for a given repository for a given period _or till the API limit is exhausted_, group by user and output it sorted by number of comments. Here is how we will execute your program and how output should look like:

```bash
node index.js --repo test-org/test-repo

  Fetching comments for past 180 days for "test-org/test-repo"...

  < your progress indicator here >

8126 comments, Anton (2166 commits)
 612 comments, Rea   (213 commits)
   8 comments, Jesse (36 commits)  
```

Please use the exact output format, notice that numbers are aligned _(this is what [famous](http://blog.npmjs.org/post/141577284765/kik-left-pad-and-npm) left-pad is for)_. Also it's up to you how to indicate progress of the fetching process, but there must be some indicator. Use last 180 days to pull comments, very large open source reapositories have way to much comments to fetch in a reasonable time. 

Fortunately GitHub has a [great HTTP API](https://developer.github.com/v3/repos/comments/) to help with the task. There are 2 types of comments we care about: 

* Comment in Issue/Pull Request
* Comment in Pull Request review on code

(You can read more in [their docs](https://developer.github.com/v3/guides/working-with-comments/), if you are curious, but it's not required for this task.)

You can use following RESTful API endpionts to fetch comments:

- [Get Issues Comments](https://developer.github.com/v3/issues/comments/#list-comments-in-a-repository)
- [Get Pull Requests Comments](https://developer.github.com/v3/pulls/comments/#list-comments-in-a-repository)

You probably noticed in a sample output that after each name there is number of commits, here is an API to help fetch that:

- [Get Statistics Per Collaborator](https://developer.github.com/v3/repos/statistics/#get-contributors-list-with-additions-deletions-and-commit-counts)

Use "total", we don't care for commits to match a date range, we just want all of them.

### Optional GraphQL API Usage

As you may know GitHub has [GraphQL API](https://developer.github.com/v4/) available as well. That is what we use at Toast for everything. It's not required to use if for this task, but would definitely earn you some bonus points.

## Requirements

* You must support `--repo` parameter as indicated above.
* Fetch only last 180 days of comments.
* Focus on making code readable.
* Define clean abstractions between modules and functions.
* Over-communicate via code and in general. Use our Slack channel for any questions.
* Create small, focused commits.
* Test your code with repositories of different sizes.
* Use ESLint and Prettier (pre-installed) for standard code formatting.
  * You would do this by running `npm run eslint:fix`, it will fix all issues it can, reformat your code and output errors it couldn't fix
  * Make sure you do this before submitting your task to us.
* Just like with about any API respect [Github's rate limits.](https://developer.github.com/v3/rate_limit/) Handle errors when limit is exceeded. Reflect remaining limits in progress indicator. Make sure you don't hit [abuse limits](https://developer.github.com/v3/guides/best-practices-for-integrators/#dealing-with-abuse-rate-limits). For GraphQL API limits refer to [this page](https://developer.github.com/v4/guides/resource-limitations/).
* All packages must be installed in `package.json`, so you project will be runnable out of the box.


## Setup

We provide a basic project setup, so you don't have to worry about setting up our environment. You would need to obtain and use your personal access token.

[Create personal access token](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/), save it, and then use it to access API to get 5000 requests/hour.

To get started:

- install node 10.16.0
- fork this repository (it will be a private fork, nobody will be able to see it)
- `cd` into repository directory
- run `npm install`
- create `src/token/__do-not-commit-me__.js` file and add your token there like that:
```js
module.exports = '<token>'
```
- run `npm start`
- make sure you see the following output
```bash
Your github token is:
<your token>
<details of your github account>
```
You can remove this entry code afterwards. Mentioned file is added to `.gitignore` already.
- run `npm run dev`, this will start development server (nodemon) that monitors your changes and re-runs the script for faster development cycle
- see `example.js` for how it's done, have fun :tada:

## When you are done
Run `npm run eslint:fix` and fix all issues. Commit and push those fixes. Slack us a link to your fork.
