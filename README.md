## Introduce
Hi, I am Andy.
Firstly, I would like to express my gratitude for giving me the opportunity to interview with the company.

Although I am a bit disappointed that I didn't have enough time to complete the test as requested, over the past week, my current company has experienced several production issues, and I have dedicated a significant amount of time to help resolve them. This is not an excuse but rather a sharing of my situation. Honestly, I really want to find a new environment, but I couldn't take a few days off to complete the test more effectively. I deeply regret this and hope that the company can consider giving me another chance. Thank you.

## Prerequisites​

- You'll need at least Node.js 16 and npm 7. 
- You also need to have an AWS account and AWS credentials configured locally. [User Guide](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
- After install `aws-cli`. Then openning your favorite terminal, I prefer `iTerm`
```
  vim ~/.aws/credentials
```
Then paste it
```
[default]
aws_access_key_id=***
aws_secret_access_key=***
aws_region=ap-southeast-1
```


## Local development

- Install dependencies
```
  yarn install
```

- Start develop React app locally. [URL](http://127.0.0.1:5173/)
```
  yarn dev:web
```

- Start develop API locally
```
  yarn dev:api
```

## Deployment
```
  yarn deploy
```