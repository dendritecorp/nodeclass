# Lesson 4
WEB: add delete and update functionality to each tweet

You can do it several ways, the simpletest way to to create web handlers for the two functionalities
- [ ] /update/id
- [ ] /delete/id

Then make two forms in each tweet
- [ ] form with delete button - action="/delete/id" method="get"
- [ ] form with update fields - action="/update/id" method="post"

When the forms are submitted they will hit the /update and /delete handlers, which should process the questions then redirect. Just like create.
