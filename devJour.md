#Development Journal for Chrome Extension "Read Share"

###Purpose
This chrome extension is an implementation of my idea put forward during
my talk with my roommates. For a long time, I have been feeling troubled 
when I am faced with a long article, especially when such an article is 
in foreign language. It takes a long time to go through it, which is usually
not necessary for articles full of nonsense words. Therefore, I am wondering
whether it is possible to mark the highlights so that you know where to focus
when you read such an article. 

My idea is that we can develop an application that allows user to highlight 
what they think are important and interesting, record it, and show the previous
results to readers for reference. Moreover, just like "Medium", the application
will also provide support for users to comment just beside the content they are
interested in.

###Problems and Solutions
1. How to position selection text?
Find selected text and its context, record it in server, and relocate it 
when the same page is loaded using string matching.
 
2. What if the selection text covers multiple HTML tags?
We only allow select text in one paragraph, just like Medium, when you have
selected text covering multiple paragraphs, the comment button will not appear.

3. 


