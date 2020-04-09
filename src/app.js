import Amplify from '@aws-amplify/core';
import Analytics, {AWSKinesisFirehoseProvider } from '@aws-amplify/analytics';
import Auth from '@aws-amplify/auth';
import awsconfig from './aws-exports'

Analytics.addPluggable(new AWSKinesisFirehoseProvider());
//Amplify.configure(awsconfig);
Amplify.configure({
    Auth: {
      identityPoolId: awsconfig.aws_cognito_identity_pool_id,
      region: awsconfig.aws_project_region
    },
    Analytics: {
      AWSKinesisFirehose: {
        region: awsconfig.aws_project_region
      }
    }
  });

const courses = document.querySelectorAll('a');
for (let i = 0; i < courses.length; i++) {
    courses[i].addEventListener('click', ((evt) => {
        const now = new Date();
    
        let dat = {
          id: now.getTime(),
          action: "click",
          item: evt
        }
        console.log(dat);
        Analytics.record({
          data: dat,
          streamName: awsconfig.aws_firehose_name
        }, 'AWSKinesisFirehose');
        
    }).bind(this, courses[i].dataset.item));
  }