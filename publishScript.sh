export $(egrep -v '^#' .env | xargs); \
web-ext sign \
--api-key ${JWT_API_KEY} \
--api-secret ${JWT_SECRET} \
--channel unlisted \
--ignore-files package*.json publishScript.sh
