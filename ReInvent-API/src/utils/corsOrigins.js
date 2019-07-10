export const corsWhiteList = process.env.NODE_ENV === 'production'
  ? [
    'http://blackbelt-88.s3-website.eu-west-3.amazonaws.com',
    'http://blackbelt-88-members.s3-website.eu-west-3.amazonaws.com'
  ]
  : [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:5000'
  ];
