# Lesson 3
1. API: Seperating endpoints into distincts functionalities and functions. 
2. WEB: Render all tweets in a html page at user request. 

### API
The API should be accesable through the /api root endpoint.
- [ ] /api/tweets GET - respond with a JSON array with tweets as objects
```
{
"tweets": 
    [
        {
            "tweet": "I like dragons",
            "user": "johnsnow"
         },
         {
            "tweet": "I am the dragon mother",
            "user": "whitehairlady"
         }
    ]
}
```

- [ ] /api/tweets POST - accept a body with an array of tweets, can be a single tweet or many. 
single
```
{
"tweets": 
    [
        {
            "tweet": "I like my sword by the name of Needle",
            "user": "crazysister"
        }
    ]
}
```

multiple tweets
```
{
"tweets": 
    [
        {
            "tweet": "I like my sword by the name of Needle",
            "user": "crazysister"
        },
        {
            "tweet": "I may seem stupid, but actually I am one smart mofo.",
            "user": "theothercrazysister"
        }
    ]
}
```

- [ ] /api/tweets/{id} GET - respond with the object of a single tweet
```
{
    "tweet": "I like my sword by the name of Needle",
    "user": "crazysister"
}
```
 
- [ ] /api/tweets/{id} PUT - edit a single tweet - respond with 
```
{
    "message" : "Successfully created tweet"
}
```

- [ ] /api/tweets/{id} DELETE - delete a single tweet - respond
```
{
    "message" : "Successfully deleted tweet {id}"
}
```

### WEB
WEB pages should be accesable through the / root and /id endpoints.
- [ ] GET `/` - in html `<ul> <li>` list all the tweets
- [ ] GET `/id` - in html `<p>` show single tweet
