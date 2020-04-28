> 'everywhere' est un salon spécial où l'on peut placer les réactions par defaut et les actions qui peuvent se faire n'importe où.

# everywhere
> L'action * est celle qu'utilise le robot s'il ne reconnait absolument pas le message du joueur.

! *
+ I am afraid you can't do that.
+ This is not something you can do.
+ I don't understand you fully…

> Le reste des actions dans le salon '#everywhere' sont utilisées comme solutions de replis si le message du joueur n'est pas reconnu dans le salon dans lequel il se trouve.

! take / grab / collect / pick up
+ You can't take that.
+ There is no point in taking that.
+ You cannot take this.
+ What are you trying to take?

! look at / observe the / inspect
+ There is no interest in watching this.
+ Why would you want to do this ?

! go to
+ You can't go there.
+ Where do you wan't to go ?

! ask / demand
+ You should ask yourself about that.
+ … But nobody answers.

! say
+ You said that.
+ You said something.
+ You said it.

! read
+ What do you whant to read ?

! eat
+ What do you want to eat ?

! drink
+ What do you want to drink ?

> dommage que ceci ne marche pas dans discord...
! show dog picture
+ ![poor dog](https://www.petmd.com/sites/default/files/dog_cone.jpg)

> mais ça ca marche
! show cat picture
+ http://pixel.nymag.com/imgs/daily/intelligencer/2014/12/08/08-grumpy-cat.o.jpg/a_190x190.w1200.h630.jpg

! yes / ok
+ ok
+ yes to what ?

! no
+ why not ?

! fuck / asshole / shit / bitch
+ Don't be rude. {+rudeness}
+ I'm not sure about that. {+rudeness}
+ Hey! Take it back, will you? {+rudeness}

! sorry / apologies / apologize / take it back
? rudeness
+ It's okay… But don't do that again. {-rudeness}
+ Apology accepted {-rudeness}
- Why would you apologize ?
- There is nothing to be sorry for.

! drink luck potion / use luck potion
? luck potion
+ You have drunk the luck potion. You feel lucky now! {+luck} {-luck potion}
- But you don't have any luck potion in your bag.

> Un bon exemple de l'écriture "logic-less" que permet la syntaxe de l'O10-C
> Ici une simple succession d'états et de réponses aléatoires permettent d'implementer un ierre-papier-ciseaux !

! play / play rock paper scissors
? ready
+ Yeah, let's play already!
- Oh, you want to play rock paper scissors? Alright! {+ready} {+rock}
- Oh, you want to play rock paper scissors? Alright! {+ready} {+paper}
- Oh, you want to play rock paper scissors? Alright! {+ready} {+scissors}

! rock
? ready
  + Here I come ! … {-ready}
  - I wasn't ready!
? rock
  + Rock! That's a draw. {+draw} {-rock}
? paper
  + Paper! I win! {+lose} {-paper}
? scissors
  + Scissors! You win… {+win} {-scissors}

! paper
? ready
  + Here I come ! … {-ready}
  - I wasn't ready!
? rock
  + Rock! You win… {+win} {-rock}
? paper
  + Paper! That's a draw. {+draw} {-paper}
? scissors
  + Scissors! I win! {+lose} {-scissors}

! scissors
? ready
  + Here I come ! … {-ready}
  - I wasn't ready!
? rock
  + Rock! I win! {+lose} {-rock}
? paper
  + Paper! You win… {+win} {-paper}
? scissors
  + Scissors! That's a draw. {+draw} {-scissors}

# 🗺010-c

! look / observe / hi / hello
+ **Welcome to O10-C!** O10-C is a fantastic textual game, where you have to explore the Art school of Aix-en-Provence via Discord. Mysteries, secrets, barking unicorns and crazy stuff await you! If you need more informations about the game, just type "!how to play" in your message. To see the credits, type "!credits". If you want to begin or continue your adventure, type "!start game" and start playing.

! how to play / how game / how to
+ Playing this game is rather simple. Every single action related to this game has to be typed with a "!" first. What comes next should be a verb, like "! look". Generally, your verb should be followed by a noun. For example : "! take clothes", "! open door", "! go to #🌈général"… A few verbs are frequently usable, such as "take", "look", "go to", "leave", "say", "enter", "inspect"… And the rest is up to you!

! credits / see credits
+ A game by abstractmachine, a line, flatland666, Bergamote, Flore G, Juste Leblanc and Velvet (have I forgotten someone?)

! who you / what you
+ I am nothing more than an incredible, fantastic and absolutely astounding game. Please play with me, my friend!
+ I am just an amazing and fully interesting game. Please play with me, my friend!

! go to #🌈général / go to general
+ Let's go! Join me in #🌈général channel. {@🌈général}

! start / play / go cour
+ Let's go! Join me in #🚬la-cour! {@🚬la-cour}

# 🌈général

! look / observe
+ You are in the school entrance hall, from here you can go to the toilets, the courtyard and the dog park (for now).

! go toilets / enter toilets / go #💩toilettes / enter #💩toilettes
? toilets
+ You are going back to the toilets {@💩toilettes} {-hands clean}
- You are now in the toilets {+toilets} {@💩toilettes} {-hands clean}

! go courtyard / go to #🚬la-cour
+ You are now in the courtyard. {@🚬la-cour}

! go dog park / enter dog park / go parc chiens / enter parc chiens / go #🙀parc-à-chiens / enter #🙀parc-à-chiens
? dog park
+ You are going back to the dog park. {@🙀parc-à-chiens}
- You are now in front of the dog park. {+dog park} {@🙀parc-à-chiens}

! go cafeteria / go cafet / go lunch / go #🍽cafète
? cafet visited
+ You decide to go back to the cafeteria. {-cafet visited} {@🍽cafète}
- You go to the cafeteria. Is it lunch time already? {+cafet visited} {@🍽cafète}
- Now, you go to the cafeteria. {+cafet visited} {@🍽cafète}

# 💩toilettes

! look / observe
+ Detecting your presence, the lights turn on by themselves. There's a sink, a hand dryer, a trash can full of paper, a mirror, and freshly paint red door.

! inspect mirror / see mirror
? having shit
+ You are currently sitting on the toilets.
+ You are currently having a shit.
- Looking in the mirror, you can see your own face. It might be a good place to put on make-up quickly.

! put on make-up / wear make-up / put on makeup / wear make up / put on make up
? makeup kit
+ Using the mirror, you put on your make-up properly. You feel beautiful, and somewhat stronger now. {+made up}
- Unfortunately, you don't have any make-up kit.

! open red door / open door
? red door
+ The red door is already open.
- The door is now open. The toilets are just in front of you. The view fills you with warth. {+red door}

! close red door / close door
? red door
+ The red door is now closed. {-red door}
- The red door is already closed.

! sit down / take a piss / take a shit
? pants down & red door
+ As you gently sit down and sigh in relief, you can't help but notice some irregularities on the red door in front of you. It seems there were drawings and signatures of all kind on this door, before it was painted red. Could it be removable? {+having shit}
- You can't do that without taking off your pants first, can you?

! look red door / look door / inspect door
+ You notice some irregularities on the red door in front of you. It seems there were drawings and signatures of all kind on this door, before it was painted red.

! take off pants / remove pants
? pants down
+ Your pants are already down.
- You have now taken off your pants. You start feeling the urgency of the situation. {+pants down}

! scratch door / scrape door / remove paint / use sponge
? itchy sponge
+ With your itchy sponge, you manage to remove the red paint of the door, discovering the remains of an ancient drawing figuring a penis-shaped dinosaur. The words "EL CHIBROSAUR" are written under it.
- It seems you are not able to remove the paint of the door bare-handed.

! get up / stop shit / stop piss / end shit / finish shit
? having shit
+ I hope you had a good time. {-having shit}
- You are currently not having a shit… Are you?

! put pants on / pull pants up / take pants / wear pants
? pants down
+ You put your pants on. {-pants down} {-having shit}
- Your pants are already on!

! inspect trash / see can / see trash / see basket / inspect can
+ This is a trash can. It is full of unstained sanitary paper.
+ This is just a trash can. It is full of unstained sanitary paper.

! remove paper / remove sanitary / search trash / search in basket
? !frog usb
+ The sanitary paper is now removed. In the middle of the trash can, there is a damaged frog-shaped USB. {+paper removed}
- The sanitary paper has been removed. There is nothing interesting.

! take usb / grab usb
? paper removed & !frog usb
+ You have taken the frog-shaped USB from the trash can.{+frog usb}
- You can't see any USB device in here.

! drop usb / throw usb
? frog usb
+ You have thrown out the frog-shaped usb in the trash can. {-frog usb}
- You don't have any usb device.

! wash hands / wash hand / clean hands / clean hand
? having shit
+ You can't do that yet: you are taking a shit.
- Washing your hands sure is a good idea! {+hands washed}

! dry hands / dry hand
? hands washed
+ Now, your hands are REALLY clean and dry. Well done! {+hands clean} {-hands washed}
- Drying your hands without washing them first? Odd.

! leave / go back
? hands clean & !having shit
+ You leave the restroom, proud of yourself for being able to wash your hands properly. {@🌈général}
- You leave the restroom, crushed by the guilt of not washing your hands properly. You really feel like a disgusting pig. {@🌈général}
- You leave the restroom… And you didn't even washed your hands properly! What a shame! {@🌈général}


# 💾numérique

! look / observe
+ There's a very large and fancy circle table at the center of the room. On this table, there are computers, some electronic devices, pieces of papers, and two giant TV screens. Oh, god, you've never seen screens that big. There's also a board on your right, and a metal closet on your left. At the back of the room stands an arcade machine.

! look board / see board / inspect board
? banana peel
+ A poster featuring a lot of screenshots from different games is pinned to the board. You can read « Video games have always been experimental » on it. Something else has been pinned next to it, but it's now gone.
- A poster featuring a lot of screenshots from different games is pinned to the board. You can read « Video games have always been experimental » on it. Oddly enough, there's also a withered banana peel pinned to the board.

! take banana / take peel
? banana peel
+ You have already taken the banana peel. You monster.
+ You've already taken the banana peel.
- You have taken the withered banana peel. You feel like comitting sacrilege. (Most importantly, what do you plan doing with this thing?!) {+banana peel}

! enter 6666 / enter code 6666
? padlock
+ The padlock has already been unlocked!
- The padlock is unlocked, the closet is now open. {+padlock}

! enter / enter code
? padlock
+ The padlock has already been unlocked!
- … But the padlock remains locked.

! look closet / inspect closet / see closet
? padlock
+ Inside the closet, you can see some laptop computers, Ipads, gaming gear and pink paper.
- The closet is locked down. It seems you need to enter a 4-numbers password to open it.

! lock padlock / lock closet / lock metal closet
? padlock
+ You have closed and locked down the closet.
- The metal closet is already locked down.

! take computer / take laptop
? padlock
+ You have taken a laptop computer from the closet. {+laptop}
- There is no laptop to be taken.

! drop computer / put back computer / drop laptop / put back laptop
? laptop
+ You have replaced the laptop computer in the closet. {-laptop} {-laptop on}
- You don't have any computer.

! boot computer / turn on computer / start computer / boot laptop / turn on laptop / start laptop
? !laptop on
- The laptop is allready on.
? laptop
+ It's time to use that computer of yours! {+laptop on}
+ Your comptuer has been booted up. You might want to use it now. {+laptop on}
- You don't have any computer right now.

! turn off computer / shut down computer / close computer / turn off laptop / shut down laptop / close laptop
? laptop
- You don't have any computer.
? laptop & laptop on
+ You decide to turn down your computer. {-laptop on}
- Your computer is already off.

! plug out usb / remove usb / take back usb / unplug usb
? usb pluged
+ The USB has been pluged out from your laptop. {-usb pluged}
- There is no USB to unplug right now.

> Un autre exemple de l'écriture "logic-less" que permet la syntaxe de l'O10-C

! use usb / connect usb / plug usb
? frog usb
- You do not have any USB…
? laptop
+ You plug your USB in your laptop {+usb pluged}
- You don't have any computer to do that.   
? laptop on
+ After a few seconds of waiting, you can finally access the content of the USB device. There's a text file called "I shall not be spoiled".
- But there's nothing much you can do with a turned off comptuer anyway…
 

! take ipad
? padlock
+ You have taken an ipad from the closet. {+ipad}
- There is no ipad to be taken.

! take paper
? padlock
+ You have taken a flashy and stylish pink piece of paper from the closet. {+pink paper}
- You have taken a regular white piece of paper from the table. {+white paper}

! take game gear / take gamepad
? padlock
+ You have taken a gamepad from the closet. {+gamepad}
- There is no gamepad to be taken here.

! look arcade machine / look arcade
+ You are in front of an arcade machine. Even though there's some rust to it, the buttons look new.

! boot up arcade / turn on arcade
? arcade lit
+ The arcade machine is already lit.
- As you boot up the machine, the screen flickers. A whole bunch of terminal lines and informations you cannot comprehend scrolls before your amazed eyes, on the screen. After a few dozen of seconds, the arcade machine appears to be finally ready {+arcade lit}.

! play
? arcade lit
+ You play Zork I. Playing a text game inside a text game sounds really funny.
- You can't do that, as the arcade machine is turned off.

! turn off arcade / turn off arcade machine
? arcade lit
+ You finally decide to leave it for now. You turn down the arcade machine, even though it pains you a little bit {-arcade lit}.
- The arcade machine is already turned off.

! look tv / inspect tv / look screen
? tv on
+ That is a big-ass screen. It is turned on. There's some sort of terrible TV show on display. It's noisy.
- That is a big-ass screen. It is turned off.

! watch tv
? tv on
+ You decide to sit down in front on the tv show and to watch it for a while. It seems to be a kind of action story, with a white man as a main character. There are crashing cars, explosions, guns, a kind of russian evil organization, and of course seducing ladies for the main character to fuck with. As you progressively feel your brain dying and pouring out from your ears while watching this shit, the show suddenly freezes for a few seconds. The screen flickers, and then displays the numbers "6666" before shuting down. {-tv on}
- You watch the TV… But the TV is turned off.

! turn on screen / turn on tv
? tv on
+ The TV is already lit.
- The screen is now lit. There's some sort of terrible TV show on display. It's noisy. {+tv on}

! turn off screen / turn off tv
? tv on
+ The screen is now turned off. It is better so. {-tv on}
- The screen is already turned off.

! leave #💾numérique / leave numeric / leave classroom / go to courtyard / go to cour / go back
+ You are now in the main hall. {@🚬la-cour}


# 🙀parc-à-chiens

! look / observe
? dog free
+ The park is surrounded by a grid that prevents you from entering. You can see a bunch of dogs and cats gathered together. They are constantly making circles like a dance. And above them all, a tall and skinny white dog with long hair
- The park is surrounded by a grid that prevents you from entering. You can see a bunch of dogs and cats gathered together. They are constantly making circles like a dance.

! talk white dog / talk tall dog / chat white dog / say to white dog
+ "You know i can understand what they're all saying in there"{+speak dog}

! listen 
+ Dogs and cats are chatting about that big hole that is underneath. Turns out that they were hiding it but now you are able to see it.


! ask white dog / what dog say
? speak dog
+ "What do you want to know ?"{+translate dod speak}
- What could you ask him ?

! ask question
? question
+ "Can you let me in? I'd like to see it." {+question asked}
- "You can pluck your face into that hole, try it out." 

! pluck face into hole / face hole
? fed by cat
+ A cat has already fed you with green grass sooner. The cat is gone, now.
- A cat feeds you with fresh green grass {+fed by cat}

! bark 
? learn how poneys bark
+ a white poney turns over and barks at you.
- … But nothing happens.

! give sandwich / feed sandwich / throw sandwich
? !sandwich
+ You don't have any sandwich, but you might find one somewhere in the school.
- You throw your sandwich in the dog park. The white unicorn catches it with its horn and runs away to eat it quietly next to the fountain in Vendome park. This good deed could help you later. {-sandwich} {+unicorn fed} 
 
! leave #🙀parc-à-chiens / leave park / leave parc / go back
+ You are now in the main hall. {-fed by cat} {@🌈général}


# 🍽cafète
! look / observe
+ The room is very calm, somebody is taking a nap on the sofa next to a plant. The vending machines are empty and making a purring noise.There is many corn flakes packs on the center table, and an itchy sponge laying by the sink.

! take glass
+ You have a glass {+glass taken}

! drop glass / put back glass
+ You put the glass back in its place {-glass taken}

! take itchy sponge / take old sponge / take sponge
? itchy sponge
+ You already have the itchy sponge.
- You have taken the itchy sponge. It's still wet, and a little bit stinky, but hey… It can be useful, somehow. {+itchy sponge}

! leave #🍽cafète/ leave cafet / leave / go back
? glass taken
+ You can't leave the cafeteria with a glass in your hands! You fool! It's too dangerous!
- You are now in the main hall. {@🌈général}

! wake up / wake up student / wake up sleeping student
? !fallen key
+ "Hey! Haven't you learned it's rude to wake up people?" They turn around and a small key falls down from the sofa.{+fallen key}
- You try waking up the student, but they just grumble as an answer.

! take key / take the key
? fallen key
+ You now have the key on you! {+storage key}
- There is no key to be taken right now…


# 🥑bbq

! look / observe
+ There's a rusted bbq. Food is frying. A lot of people are chatting around, some of them have sandwiches. There's also a large table on which you can see some crisps, bread, salad, tomatoes, fried sausages and fried vegetables.

! say hi / say hello / say bonjour / say coucou
+ As you say "hi", some people answer with hearty smiles.

! ask fire / demand fire / borrow fire / borrow lighter / ask lighter
? lighter
+ You already have a lighter, so no point in asking for another one.
- You approach a group of smoking students and ask for a lighter. One of them answers : “Well, sure! Take it, it's yours”, as they hand an old fire lighter over to you. You take it and thank them for their kindness. “It's nothing, really, I've been asking for lighters for years, now. I know how it feels!” {+lighter}

! talk / chat
+ You really want to chat… but you can't think of anything to talk about right now.

! make sandwich / take sandwich / take food / prepare sandwich
? sandwich
+ You are already holding a sandwich. You are really voracious, aren't you?
- The smell of food is way too tempting. You get close to the table and start picking food to put in your sandwich. After a few meticulous choices, you end up with a beautiful and appetizing sandwich. It almost feels like art. {+sandwich}

! eat sandwich / bite sandwich
? sandwich
+ You can't hold it anymore. The sandwich is in your hands, and you decide to eat it. The sandwich tastes great. It's marvellous! {-sandwich}
- … But you don't have any sandwich.

! eat
+ What do you want to eat?

! go to
+ From here, you can only go to #🚬la-cour…

! leave / go back / go to courtyard / go to #🚬la-cour
+ You finally decide to leave the BBQ for now. {@🚬la-cour}



# 🎨galerie


# 🏡villa

! look / observe
+ please complete me

! complete / say / talk
+ I was talking to my programers.

! leave / go back / go to cour
+ You finally decide to leave the villa, going back to the courtyard. {@🚬la-cour}

# 🎬ciné-club

# 🚬la-cour

! look / observe
+ This is the courtyard of the school. A good amount of people are gathered around a flaming BBQ. Some of them are playing, some of them are chatting while smoking, and some of them are eating. On the ground, there's a grate protecting the storm drain. {-helped}

! see grate / look grate / see drain / look drain
? grate removed
+ The grate has been removed. The storm drain is deep and obscure.
- This is the strom drain. It looks rather deep. A grate is protecting it.

! remove grate / take grate / move grate / open grate
? !grate removed & helped
+ With the help of the students, you are able to remove the grate easily. {+grate removed} {-helped}
- The grate is heavy. You are not sure to be able to remove it by yourself without getting hurt. You might need help.

! close drain / place grate / put grate / close grate
? grate removed
+ With some efforts, you succesfully close the drain with the heavy grate. {-grate removed}
- The grate is already in its place.

! ask help / call help / please help
? helped
+ Someone is already helping you.
- You ask for help to nearby people. Some of the students offer you some help. {+helped}

! ask fire / demand fire / borrow fire / borrow lighter / ask lighter
? lighter
+ You already have a lighter, so no point in asking for another one.
- You approach a group of smoking students and ask for a lighter. One of them answers : “Well, sure! Take it, it's yours”, as they hand an old fire lighter over to you. You take it and thank them for their kindness. “It's nothing, really, I've been asking for lighters for years, now. I know how it feels!” {+lighter}

! enter drain / go to drain / go down / get down
? grate removed
+ Now that the grate is removed, you can go down into the darkness below, deep inside the storm drain… After going down for a moment into the darkness, you finally perceive a glimmer of light. As you approach the light, you discover a very strange room… {@🧙♀le-petit-coin-sorcellerie} {+candles lit}
- The grate prevents you from going down.

! go to
+ From the courtyard, it seems to be possible to go to #💾numérique, #🥑bbq, #🏡villa, #🔩métal, #🤖mécatronique or #🌈général.

! go villa / go #🏡villa
+ You leave the courtyard and go to the villa. {@🏡villa}

! go numeric / go #💾numérique / go numérique
? visited numeric
+ You are going in the numeric classroom, once again. {@💾numérique}
- You are going in the numeric classroom. {+visited numeric} {@💾numérique}

! go metal / go #🔩métal / go métal
+ You are going to the metal workshop. {@🔩métal}

! go #🤖mécatronique / go mecatronic / go mécatronique
+ You are going to the mecatronic workshop {@🤖mécatronique}

! go bbq / go grill / approach bbq / go #🥑bbq
+ The smell of food attracts you… {@🥑bbq}

! go to general / go to #🌈général / go back
+ You are going back to #🌈général. {@🌈général}

# 🧙♀le-petit-coin-sorcellerie

! look / observe
? candles lit
+ You are inside of a strange and rather dark room, in which a particular scent is floating. The inside is enlightened by the flames of many candles. It feels warm and cosy. There are cushions on the ground, withered plant bouquets and incens burners hanging on the roof. There is also a round table in the center of the room on which you can see many witchcraft-related items, such as sage sticks, stones and cristals marked with sigils, plants, a mortar and a pestle, vials, tarot decks, a pendulum, and a ceremonial blade. You can notice a cauldron surrounded by salt on the ground at the back of the room and, of course, many shelves full of books.
- The room is completely obscure. You can't see anything right now.

! take candle / grab candle
? candles lit
+ The candles are lit. Your pocket would be burning if you took one in this state.
- Now that the candles are turned off, you manage to take one without getting burnt. {+candle}

! throw candle
? candle
+ For some reason, you throw your candle across the room. {-candle}
- You don't have any candle.

! leave candle / drop candle
? candle
+ You have dropped your candle. {-candle}
- You don't have any candle.

! use candle
? candle & candles lit
+ Your candle is lit and seems to be potentially useful, somehow… But you can't think of any usage right now.
- You can't do that in this state.

! turn on candle / light candle
? !candles lit & lighter
+ With your cigarette lighter, you finally manage to light up one candle. As soon as the fuse catches on fire, every other candles light up by themselves. You can't help but feeling a little bit nervous about it.{+candles lit}
- It doesn't seem to be doable right now…

! blow candle / turn off candle
? candles lit
+ You approach one candle and decide to blow it. At your surprise, every other candles get turned off in an instant! You can't see anything right now.{-candles lit}
- The candles have already been blown.

! take vial / take flask
? vial
+ You have already taken a vial.
- The vial is now taken. Are you looking for some potion crafting? {+vial}

! mix / craft
? candles lit
+ What are you trying to mix together?
- You can't mix anything if there's no light!

! see book / inspect book / read book / see shelves / inspect shelves
? candles lit
+ Inspecting the shelves, a few books catch your attention : « Basics of witchcraft », « Sorcières : La puissance invaincue des femmes »…
- You can't read anything if there's no light!

! read
? candles lit
+ Unfortunately, you can't find that book on the shelves…
- As far as you know, humans can't read into complete darkness, can they?

! read sorcières puissance femmes
? candles lit
+ « Qu’elles vendent des grimoires sur Etsy, postent des photos de leur autel orné de cristaux sur Instagram ou se rassemblent pour jeter des sorts à Donald Trump, les sorcières sont partout. Davantage encore queleurs aînées des années 1970, les féministes actuelles semblent hantées par cette figure. La sorcière est à la fois la victime absolue, celle pourqui on réclame justice, et la rebelle obstinée, insaisissable. Mais qui étaient au juste celles qui, dans l’Europe de la Renaissance, ont été accusées de sorcellerie ? Quels types de femme ces siècles de terreur ont-ils censurés, éliminés, réprimés ? Ce livre en explore trois et examine ce qu’il en reste aujourd’hui, dans nos préjugés et nos représentations : la femme indépendante – puisque les veuves et les célibataires furent particulièrement visées ; la femme sans enfant – puisque l’époque des chasses a marqué la fin de la tolérance pour celles qui prétendaient contrôler leur fécondité ; et la femme âgée – devenue, et restée depuis, un objet d’horreur. Enfin, il sera aussi question de la vision du monde que la traque des sorcières aservi à promouvoir, du rapport guerrier qui s’est développé alors tant à l’égard des femmes que de la nature : une double malédiction qui reste à lever. »
- You can't read anything if there's no light…

! read basics of witchcraft
? candles lit
+ It seems to be a book full of different recipies and guides for potion crafting, rituals, spells, and so on.
- You can't read without any light source.

! leave / go back / go to cour
? !candles lit
+ By moving slowly and palpating the walls, you manage to get out of the completely dark room. {@🚬la-cour}
- You finally decide to go back to where you came from. {@🚬la-cour}


# 🤖mécatronique
! look
+ mecatronic.

! leave / go back / go to cour
+ You decide to leave the workshop, going back to the courtyard. {@🚬la-cour}


# 🔩métal
! look / observe
? !radio down
+ There is very loud music coming from an small radio and huge machines are working. Some metal loss are covering the ground and just after the entrance door, there is a mysterious storage room, the door is closed.
- There is no music coming from the small radio. Huge machines are working. Some metal loss are covering the ground and just after the entrance door, there is a mysterious storage room, the door is closed.

! open door / open the door / unlock door
? storage key
+ You've unlocked the door, a gigantic white dog was stuck in there! he's wearing working gloves on his paws and can barely fit in this room. {+storage unlocked}
- The door is locked, you need to find the key…

! bark / talk to dog / communicate dog / say hi
? storage unlocked
+ "I thought you'd never open!" He says, passing by with a sassy walk. {+dog free}
- Unfortunately, you can't see any dog to talk with here.

! turn music off / turn volume off / turn radio off / turn volume down
? !radio down
+ This is much better… You can now hear some noise coming from the storage room. {+radio down}
- The volume has already been turned down.

! turn music on / turn volume up / turn radio on
? radio down
+ Yeah, let's turn the music back on! Who cares anyway? {-radio down}
- The music is already as loud as it could be!

! approach storage / listen
? radio down
+ You can hear a sweet voice coming from the storage room: "can you please look for the key ? I left it in the lunch room".
- You are trying to hear something… But the music is too loud!

! leave / go back / go to cour
+ You finally decide to leave the workshop, going back to the courtyard. {@🚬la-cour}

! go mecatronic / go mécatronique / go #🤖mécatronique
+ From there, you go to the next room: the mecatronic workshop. {@🤖mécatronique}


# 🧤bois

# ✏dessin

# 🕸web

# 🤪blagues-memes-et-devinettes

# 🐒a1
! look / observe
+ Look at these students! They might not be experienced, but hey, they learn a lot of cool stuff!

! leave / go back
+ Well, bye! {@🌈général}

# 🐵a2
! look / observe
+ Look at these students! Do you think they're thinking about their diploma yet?

! leave / go back
+ Well, bye! {@🌈général}


# 🙈a3
! look / observe
+ Look at these students! They look so stressed, lol!

! when diploma
+ Ha ha ha ha ha ha ha! I have no idea. Seriously. Good luck with this shit.

! pass diploma
+ You easily pass your diploma since there is no real exam this year thanks to the 🦠, you are now officially a fourth year student. Yay!{+A4}

! leave / go back
+ Well, bye! {@🌈général}

# 🙉a4
! look / observe
+ Look at these students! They have passed their diploma before the great 🦠! How lucky they must be…

! leave / go back
+ Well, bye! {@🌈général}

# 🙊a5
! look / observe
+ Look at these students! They might become artists some day!

! when diploma
+ Huh… *shrugs*

! pass diploma
+ You have passed! Congrats! … I guess? {+real artist}

! leave / go back
+ Well, bye! {@🌈général}

# 🕷sous-sol

! look / observe
+ Oooooh! Very spooky!

! leave / go back
+ You leave it for now. {@🚬la-cour}