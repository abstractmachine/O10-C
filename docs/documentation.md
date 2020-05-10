Documentation
=============

*(syntax name : ZorkDown ?)* is a lightweight single file game engine to play [Zork]-like interactive game. There are two things: the parser on the one hand (a single light .js file), and a your text content on the other hand, i.e. the content of the textual game.

Its syntax is meant to be closer to writing logic than pure programing logic. (Blablabla logic-less syntaxe based on markdown.) Here is a simple example.

```
! look
+ Detecting your presence, the lights turn on by themselves.
```

As you can see, anyone can fairly easily understand what these two lines are about : when I look (action), there's a description (response). This syntax is about being easily writtable, even by people who are not confortable with code. It is rather simple and yet robust and powerful.

[Zork]: https://en.wikipedia.org/wiki/Zork

### Main functionalities ###

*(syntax name)* is inspired by [Zork]. (explain how Zork works)

#### – Actions ####

Each possible action is described through paragraphs, and each paragraph is composed by lines. The first line of a paragraph must be an action, described by a `!` at the beginning of the line.

```
! take lamp
```

The paragraph beginning with `! take lamp` is the one played when the players writes `!take lamp`. It is possible, of course, to have multiple ways to write an action, each way being seperated by ` / `.

```
! take lamp / grab lamp / take lantern / grab lantern
```

> Note that, as long as the action written by the player includes `take lamp`, anything works. That means it is not necesary to write `take the damn lamp` in your game file, because `take the damn lamp` has `take lamp` in it. Note that it is also case-insensitive. Therefore:
> ~~`! Take Lamp / take the lamp / take the magical lamp`~~ :-1:
> `! take lamp` :thumbsup:

#### – Responses ####

Each paragraph has at least an action and an response. A response is what the game answers to an action. A response is described with a `+` sign at the beginning of the line.

```
+ You have taken the lamp.
```

Put together, you have a paragraph:

```
! take lamp
+ You have taken the lamp.
```

It is also possible to have multiple reponses:

```
! take lamp
+ You have taken the lamp
+ You have the lamp, great!
+ The lamp is yours.
+ My prrrrrecioussss!
```

In such a case, a random reponse will be picked by the game engine, among the different possibilities.

#### – Variables ####

The game engine offers the possibility to declare booleans. Basically, booleans are on / off buttons for code. Their values are `true` (on) or `false` (off), nothing else. A boolean can describe a state (are my hands washed? Is the dog here?), or an item (do I have the key?), or whatever you want that could be answered by yes or no.

A boolean is set into curly brackets, inside of a response.

```
+ You have taken the lamp {+magical lamp}
```

A `+` sign in front of the boolean name means an "on" or `true` state, while `-` means an "off" or `false` state.

```
! drop lamp
+ You have dropped the magical lamp. {-magical lamp}
```

> Note: unlike many programing langages, you don't need to declare your variables at the beginning of your file, like `public bool magicalLamp = false;`. Variables are set to `false` by default, and automatically declared by the parser. Every variables are global. Also, the name of your boolean can contain spaces.

#### – Items
Every states and changes are possible through booleans, including items. During the game, items collected by the player are stored in his inventory and accessible through the `! inventory` command, like Zork. Here is the way to attach a description to a boolean and to make it an item.
```
! take lamp
+ You have taken it {+magical lamp -> A magical lamp offered by grandma}
```
By doing so, the boolean `magical lamp` is going to be considered as an item by the program. When recieving the command `! inventory`, the game will output:
```
You have:
    — A magical lamp offered by grandma
```
If you want anything to be displayed in the `inventory`, you just have to write its description *once*.
```
! clean hands
+ Your hands are now clean {+clean hands -> Your hands clean}
```
In the `inventory`, when having the lamp and your hands clean:
```
You have:
    — A magical lamp offered by grandma
    — Your hands clean
```
> Note: As mentioned above, you only need to write a description once. Plus, **that description mustn't be done** inside of a condition, like `? lamp -> A magical lamp`. It must be done inside of a response, with the boolean setting. Therefore:
> ~~`? lamp -> A magical lamp`~~ :thumbsdown: 
> `{+lamp -> A magical lamp}` :thumbsup: 

#### – Conditions ####

Booleans are used through conditions. Conditions are useful for making different kind of interactions in your game. Conditions are written with a `?` sign at the beginning of the line.

```
? magical lamp
```

That line above literally means “Do I have the magical lamp?”. If `magical lamp` is set to `true` (or `+` or "on", that's the same), then the condition is `true`. When the condition is true, the game engine replies the positive response (`+` response):

```
! take lamp
? magical lamp
+ … But you already have taken the lamp!
```

Otherwise, if the condition is `false`, the game engine replies the negative response, written with a `-` sign. It is the equivalent of an `if / else` statement in programing language.

```
! take lamp
? magical lamp
+ You already have taken the lamp!
- You have taken the lamp. {+magical lamp}
```

It is also possible to reverse a condition with the `!` sign. In this case, `? !magical lamp` means "Do I have **not** the magical lamp?". This condition is `true` if the player do **not** have the magical lamp.

```
! take lamp
? !magical lamp
+ You have taken the lamp. {+magical lamp}
- You already have the lamp!
```

Note that you can check multiple booleans in a single condition, with ` & `. 

```
! take lamp
? !magical lamp & !blind
+ Thankfully, you're not blind yet. You have taken the lamp. {+magical lamp}
- It is not possible to take the lamp.
```

#### – Multiple conditions ####

Checking multiple booleans in a single condition sure is useful, but can be rather limited. Know that there is the possibility of having multiple conditions.

```
! take lamp
? !troll here
+ You reach for the lamp… 
- The troll prevents you from reaching the lamp!
? magical lamp
+ But you already have the lamp, dummy!
- And successfuly take it! {+magical lamp}
```

The conditions are checked from up to down. If the first condition is `true`, the game engine outputs its `+` response and then checks the next condition, and so on. However, as soon as a negative response is reached, the multiple conditions take end. The rest is not checked. That would be the equivalent of a `return` in programing langages.

In the example above, if the troll is *not* not here (i.e the troll is here), then the condition `!troll here` is `false`. The negative response is output (`The troll prevents you from reaching the lamp!`), and the rest is not checked because of the negative answer.

This possibility is useful for changing environment description depending on different conditions:

```
! look
+ The room is rather dark. 
? troll here
+ A tall and menacing figure is staring at you.
```

Of course, multiple responses work with multiple conditions.

```
! take lamp
? !troll here
+ You reach for the lamp… 
- The troll prevents you from reaching the lamp!
- The troll roars to intimidate you.
- The troll hits you violently with its club. {=DEATH}
? magical lamp
+ But you already have the lamp, dummy!
- And successfuly take it! {+magical lamp}
```

#### Others ####

It is possible to add comments to your file: words that are going to be ignored by the parser. To do so, type `>` at the beginning of your comment line.

```
> This is a comment. This is not read by the parser.
```

To make a default response for actions that are not understandable by the game engine, write `! *`, as below:
```
> This is output by default, if nothing else is to be ouput.
! *
+ I don't understand this command.
```

To trigger the end of the game, just add `{=DEATH}` to a response, just as below:

```
! take lamp
+ … But the lamp was a lie! You die in the process. {=DEATH}
```

### Salons ###

This part is more specific to Discord. If you want your game to run as a bot on a discord server, you might want to read the "Parser" part down below.

#### Local actions
This game engine offers the possibility to run through different salons, with specific content for each salon, like a character going from a room to another. The character can be only at one salon at a time. To write content for a salon, write its name as following:

```
# 🗺o10-c
> This is the main salon of the game.
```
Every actions following this line will be only doable in the #🗺010-c salon.

```
# 🗺o10-c

! look
+ Welcome to O10-C!

# 🏡villa
> This no longer belongs to 🗺010-c. It belongs to 🏡villa.

! look
+ Welcome to the villa!
```

Note that the first salon in your game file will be the default salon: this is where the game is going to start. In our example, that would be #🗺010-c.

#### Global actions

For global actions, i.e actions that are possible everywhere, just write those in the top of the story, prior to any #salon creation:

```
> The following paragraphs are global

! say
+ You said that.
+ You said something.
+ You said it.

# First salon
```
#### Going from one salon to another
You can go from the current salon to another with a command into curly brackets, like a boolean: `{@(name of salon)}`
```
# 🗺010-c

! go to #🌈général / go to general
+ Let's go! Join me in #🌈général channel. {@🌈général}
```
> Note: do not type `#` for that command. Just type the correct salon name without the `#` sign.

When the game goes to another salon, it automatically triggers the `! look` action. The `! look` action is what contains the description of the place. Every salon of your game should have at least a `! look` action and a `! leave / go back` action (without the possibility to leave, you would be trapped forever!).

```
# 🌈général

! look / observe
+ You are in the school entrance hall.

! leave / go back
+ Have you forgotten your lamp? You decide to leave. {@🗺010-c}
```


### Examples ###

#### Taking and droping an item:
```
! take lamp
? magical lamp
+ You already have taken the lamp!
- You have taken the lamp. {+magical lamp}

! drop lamp / put lamp
? magical lamp
+ You have droped the lamp. {-magical lamp}
- You don't have a lamp.
```
A very basic item interaction: taking and droping. You can't drop something you don't have, or take something you already have, can you?

#### A default response for an action:
```
# everywhere 

! take
+ You can't take that.

! take lamp / take lantern
+ You have taken the lamp. {+lamp}
```
In this example, when the player tries to `take` something, the response `You can't take that.` is output by default, because there is `take` in the action. However, if the player types `!take lamp` instead of something else, the `! take lamp` action takes priority over the `! take` action, because it is closer to what the player typed. Default responses are very useful for the player to understand what actions are possible, even though they're trying to take / see / use the wrong thing.

#### Entering a code:
```
! enter 6666 / code 6666
? padlock
+ The padlock has already been unlocked!
- The padlock is unlocked, the closet is now open. {+padlock}

! enter / code
? padlock
+ The padlock has already been unlocked!
- … But the padlock remains locked.
```
This example is very similar to the previous one, but applied in a different context. If the player tries entering a different code from the correct one, it won't work.

#### A random death machine:
```
! russian roulette
+ *click* !
+ *click* !
+ *click* !
+ *click* !
+ *click* !
+ BANG! {=DEATH}
```
In this example, there's a 1/6 chance for the `+ BANG!` response to be triggered. If so, the player dies. This can be useful for a situation in which the player has to do the same thing all over again, until it works.

#### A changing description
```
! look
? light on
+ An armor stands still before you. 
- You can't see anything right now.
? !sword
+ It holds a great steel sword.
- The sword it was holding has been taken.
```
In this example, the description will change depending on two things. The light on the one hand, and the sword as an item on the other hand. If there's no light, nothing can be seen, thus the description ends with `You can't see anything right now` regardless of having the sword or not. If the light is on, then the description begins with `An armor stands still before you`. It is then followed by one of the next responses: `It holds a great steel sword` or `The sword it was holding has been taken`, depending on `? !sword`. This is very useful when some actions have impacts on the environment.

### Quick syntax reference

#### Single action
```
! action
```
#### Alternatives for a single action
```
! action / action / action
```
#### Wildcard action
```
! *
```
#### Single condition
```
? boolean
```
#### Reversed condition
```
? !boolean
```
#### Multiple conditions
```
? boolean1 & boolean2
```
#### Positive response
```
+ You did it.
```
#### Negative response
```
- You didn't do it.
```
#### Random positive responses
```
+ 1/3 chances to be output.
+ 1/3 chances too.
+ And, 1/3 chances again.
```
#### Random negative responses
```
- 1/3 chances to be output.
- 1/3 chances too.
- And, 1/3 chances again.
```
#### Setting boolean to true
```
{+boolean}
```
#### Setting boolean to false
```
{-boolean}
```
#### Setting boolean with a description
```
{+boolean -> Description content}
```
#### Salon specifying
```
# salonName
```
#### Salon changing
```
{@salonName}
```
#### Game Over
```
{=DEATH}
```
#### Comment
```
> This is a comment
```

### Parser ###

#### What is a parser?

#### How to make it run on Discord


### Other ###
