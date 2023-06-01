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