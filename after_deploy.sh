echo "Downloading import map from S3"
aws s3 cp s3://demo-micro-frontends/@orgName/importmap.json importmap.json
echo "Updating import map to point to new version of @orgName/demo-micro-frontends-app-team-2"
node update-importmap.mjs
echo "Uploading new import map to S3"
aws s3 cp importmap.json s3://demo-micro-frontends/@orgName/importmap.json --cache-control 'public, must-revalidate, max-age=0' --acl 'public-read'
echo "Deployment successful"
