> To do list : https://hackmd.io/4mckHWfnT1GGA-wMnKRPbw?both
> Documentation : https://hackmd.io/s_8hu2MPQr2iveB_6lfVbw

# everywhere

> 'everywhere' est un salon spécial où l'on peut placer les réactions par defaut et les actions qui peuvent se faire n'importe où.


> L'action * est un "attrape-tout" utilisé quand aucune autre action n'est déclanchée.
 
! *
+ I am afraid you can't do that.
+ This is not something you can do.
+ I don't understand you fully…
? spider here & candle lit
+ The spider tries to stab you with its left foreleg. The hit missed, but you're not going to dodge forever.
+ More liquid is pouring out from the giant spider's jaws, as a sign of its hunger.
+ The deadly beast is staring at you. What do you plan doing, now? Cry for help?
+ The dreadful spider spits a cluster of violet liquid towards you. By instinct, you protect yourself with your arms. The candle you are holding gets hit by the liquid. The fuse is now off, and there's nothing you can see anymore. {-candle lit}
+ The spider sweeps through the air with its right foreleg. You fall back, but manage to get up quickly.
+ The spider stabs you with its left foreleg. The move was too quick for you, you didn't see it coming soon enough. As you breathe heavily, you lose consciousness. It's not long before you lose your life too, between the legs and the jaws of the beast. You are dead. {=DEATH}
? spider here & !candle lit
+ Something suddenly stabs and pierces through your body. You were not able to dodge it. Your life ends in a last breath of despair, into complete fear and darkness. You are dead. {=DEATH}
+ You can hear the sound of some liquid is pouring out from somewhere nearby.
+ Even though you can't see anything, you can feel its dreadful presence.

> Le reste des actions du salon '#everywhere' sont utilisées comme solutions de replis si le message du joueur n'est pas reconnu dans le salon dans lequel il est émit.


> --- Utiliser des objets dans tous les salons ---

! eat sandwich / bite sandwich
? sandwich
+ You can't hold it anymore. The sandwich is in your hands, and you decide to eat it. The sandwich tastes great. It's marvellous! {-sandwich}
- … But you don't have any sandwich.

! eat chocolate
? chocolate bar
+ Yummy! You have eaten the chocolate bar. {-chocolate bar}

! eat crisps / eat chips / eat potato
? potato chips
+ You have eaten the potato chips. Crunch crunch! {-potato chips}

! take blue pill
? !blue pill
- You ready took the blue pill.
? !red pill
+ You have taken the blue pill, are you certain that was the right choice to do? {+blue pill -> The blue pill} {+tada}
- You took the red pill allready, you can't take an other pill, that choice was definitve.

! take red pill
? !red pill
- You allready took the red pill.
? !blue pill
+ You have taken the red pill, are you certain that was the right choice to do? {+red pill -> The red pill}
- You took the blue pill allready, it is to late to take an other pill.

! draw sword / use sword / take sword / get sword / unsheathe sword
? !sword drawn
- Your sword is already drawn, ready for combat.
? master sword
+ You draw your sword and get ready for anything. You can't help but to think how bad ass you look right now. {+sword drawn}
- You do not have any sword… That would have been bad ass though.

! sheathe sword / resheath sword / re-sheath sword
? master sword
- You don't have any sword.
? !sword drawn
+ Your sword isn't drawn.
- You have sheathed your weapon. {-sword drawn}

! take / grab / collect / pick up
+ You can't take that.
+ There is no point in taking that.
+ You cannot take this.
+ What are you trying to take?

> --- ---

! look at / observe the / inspect
+ There is no interest in watching this.
+ Why would you want to do this ?

! go to
+ You can't go there.
+ Where do you want to go ?
+ It's not possible to go there.

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

> The killing machine

! kill me / commit suicide / eat meat
+ Suddenly you are dead {=DEATH}

> Dommage que discorde ne gère pas la syntaxe MarkDown pour afficher des images...

! show dog picture
+ ![poor dog](https://www.petmd.com/sites/default/files/dog_cone.jpg)

> Mais ceci fonctionnne par contre. Discord affichant une previsualisation des liens envoyés

! show cat picture
+ http://pixel.nymag.com/imgs/daily/intelligencer/2014/12/08/08-grumpy-cat.o.jpg/a_190x190.w1200.h630.jpg
+ https://thumbs.dreamstime.com/t/cute-black-cat-peeking-out-brown-paper-bag-white-71701345.jpg
+ http://2.bp.blogspot.com/-RzTwWyM_hTA/TycC4rYariI/AAAAAAAAm-s/Pu-5j3Ylnvs/s1600/ugly-cat-1.jpg
+ https://cdn.acidcow.com/pics/20100607/ugly_cats_16.jpg
+ https://i.imgflip.com/1jvio4.jpg

! show cat movie
+ https://www.youtube.com/watch?v=QtC3Bo9B0yI

! show ascii art
+
```
:  /\ ___ /\
: (  o   o  ) 
:  \  >#<  /
:  /       \  
: /         \       ^
:|           |     //
: \         /    //
:  ///  ///   --
```

! yes / ok
+ Okay.
+ Yes to what?

! no
+ Why not?

! fuck / asshole / shit / bitch / cunt 
+ Don't be rude. {+rudeness}
+ I'm not sure about that. {+rudeness}
+ Hey! Take it back, will you? {+rudeness}

! sorry / apologies / apologize / take it back / i'm sorry / i am sorry
? rudeness
+ It's okay… But don't do that again. {-rudeness}
+ Apology accepted {-rudeness}
- Why would you apologize ?
- There is nothing to be sorry for.

! drink luck potion / use luck potion
? luck potion
+ You have drunk the luck potion. You feel lucky now! {+luck} {-luck potion}
- But you don't have any luck potion in your bag.

! jump
? have legs
+ hop !
- no legs, no jump.

> Un bon exemple de l'écriture "logic-less" que permet la syntaxe de l'O10-C
> Ici une simple succession d'états et de réponses aléatoires permet d'implementer un pierre-papier-ciseaux ! Stylé !!!

! play / rock paper scissors / play rps
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

! What is a lug nut ?
+       this is a nut lug 
                       _ _ _
                     /       \
                     --------- 
                    /         \
                    |---------|
            **  **  |---------|***   **
             **     |---------|   **
                    \         /
                     \-------/
       
       
     



# 🗺o10-c

! look / observe / hi / hello
+ **Welcome to O10-C!**
O10-C is a fantastic textual game, where you have to explore the Art school of Aix-en-Provence via Discord. Mysteries, secrets, barking unicorns and crazy stuff await you! If you need more informations about the game, just type "`!how to play`" in your message. 
To see the credits, type "`!credits`". If you want to begin or continue your adventure, type "`!start game`" and start playing.

! how to play / how game / how to
+ Playing this game is rather simple. Every single action related to this game has to be typed with a "`!`" first. What comes next should be a verb, like "`! look`". Generally, your verb should be followed by a noun. For example : "`! take clothes`", "`! open door`", "`! go to #🌈général`"…
To see what is in your inventory, just type "`!inventory`"
A few verbs are frequently usable, such as "`take`", "`look`", "`go to`", "`leave`", "`say`", "`enter`", "`inspect`"… And the rest is up to you!

! credits / see credits
+ A game by abstractmachine, a line, Bergamote, flatland666, Flore G, Juste Leblanc and Velvet (have I forgotten someone?)

! who you / what you
+ I am nothing more than an incredible, fantastic and absolutely astounding game. Please play with me, my friend!
+ I am just an amazing and fully interesting game. Please play with me, my friend!

! go to #🌈général / go to general
+ Let's go! Join me in #🌈général channel. {@🌈général}

! start / play / go cour / go courtyard
+ Let's go! Join me in #🚬la-cour! {@🚬la-cour}


# 🌈général

! look / observe
+ You are in the school entrance hall, from here you can go to the toilets, the courtyard, the dog park or the basement.

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

! go underground / go basement / go #🕷sous-sol
+ You go down into the basement of the school. {@🕷sous-sol}

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
+ You have taken the frog-shaped USB from the trash can.{+frog usb -> A rather damaged frog-shaped USB}
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
- You have taken the withered banana peel. You feel like comitting sacrilege. (Most importantly, what do you plan doing with this thing?!) {+banana peel -> A withered banana peel}

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

! take laptop
? padlock
+ You have taken a laptop computer from the closet. {+laptop -> A laptop computer}
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
+ You plug your USB in your laptop. {+usb pluged}
- You don't have any computer to do that.
? laptop on
+ After a few seconds of waiting, you can finally access the content of the USB device. There is a video. It is a kind of tutorial made by a frog wearing sunglasses and smoking a pipe. At first, it looks like a meme, but you realise soon enough this video is kinda serious: this tutorial is about swordsmanship and deadly techniques. The frog cleaves stones in half with a single swing! The last technique showed in the tutorial is something called "dragon blade", a bursting attack setting fire on its target. How could a frog do such a thing?!
- But there's nothing much you can do with a turned off comptuer anyway…
 
! take ipad
? padlock
+ You have taken an ipad from the closet. {+ipad -> An Ipad}
- There is no ipad to be taken.

! take paper
? padlock
+ You have taken a flashy and stylish pink piece of paper from the closet. {+pink paper -> A flashy and stylish pink piece of paper}
- You have taken a regular white piece of paper from the table. {+white paper -> A regular piece of paper}

! take game gear / take gamepad
? padlock
+ You have taken a gamepad from the closet. {+gamepad -> An Xbox gamepad}
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
+ The park is surrounded by a grid that prevents you from entering. You can see a bunch of dogs and cats gathered together. They are constantly making circles like a dance.
? dog free
+ And above them all, a tall and skinny white dog with long hair.
? !unicorn fed
+ Among the gathered dogs and cats stands a white unicorn.
? !dragon blade
+ Further on, you can notice a curious frog watching the scene. It is wearing sunglasses and smoking a pipe.

! talk frog / chat frog / inspect frog / go to frog / approach frog
? !dragon blade
+ You decide to meet the frog. You approach him and notice the frog is wearing a blade on its back. You say hi. "This is no way to talk to a blade master, young one", says the frog. "Please, show me a little bit more discipline and greet me properly!"
- …But the frog is gone.

! greet frog / bow before frog / bow to frog / show respect frog
? !dragon blade
+ You bow and greet the blade-master frog properly. The frogs smiles at you. "Now, that's what I call a proper greeting. Hello, young one. My name is Saschi. As you might notice, I am a blade master. Tell me, what brings you here?"
- …But the frog is gone.
? master sword
+ Saschi suddenly notices your sword. "Oh my. Could it be? That blade is no ordinary blade, young one. If you want to use it properly, you might need my teaching. What do you think? I can teach you one of my best techniques."
- Saschi smokes a bit and speaks up. "I can see you do not wield any sword, young one. I am afraid there's nothing much I can help you with in this state."

! ask for technique / ask teaching / ask teachings / ask saschi technique / beg for teaching / say teach me master
? !dragon blade
- …But the frog is gone.
? master sword & !usb given
+ The frog nods slowly while speaking. "I am glad to see your enthusiasm, young one. If you want to recieve my teachings, you have to do something first for me. Fret not, young one: this is no harduous task. I would like you to find my USB device that has been stolen. It is green and it has the shape of a frog. Its content is rather important to me, you see? Bring it back to me, and I'll teach you my special technique. Best of lucks!"
? master sword & usb given
+ Saschi the frog takes a long breath. "So be it, young one. I shall teach you thee art of the blade." You spend a rather long time together, Saschi teaching you how to wield correctly your sword, how to swing it, how to focus despite of the dog barks and more… In the end of the training, you feel exhausted. "Very good, young one", says the frog. "I am rather impressed. Now for the final step. If you want to use my special technique, you need to hold your sword tight and shout *Dragon Blade* !" You feel confused. "Yes, young one. The shouting is very important, you see. I gives you strength and confidence when you most need it. Now, I must take my leave. It has been a pleasure, young one. And, don't forget! *Dragon Blade*!" The frog leaves you, riding a unicycle in a haze of smoke. What an odd character. You are now able to use *Dragon Blade*! {+dragon blade -> The secret of the Dragon Blade technique}
? !master sword
+ Saschi the frog sighs in disappointment. "I am so very sorry, young one. If you want me to teach you my technique, you need a sword."

! give usb / give to frog / give to saschi
? !dragon blade
- …But the frog is gone.
? frog usb
+ The smoking frog smiles in relief. "My, my! You have found it, young one! Congratulations. Thank you for your fruitful efforts. Now, you can ask for my teachings when you want. I'll be just here." {+ usb given} {-frog usb}
- You don't have any frog-shaped usb.

! dragon blade / dragon blade! / dragon blade!! / dragon blade!!! / use dragon blade
? dragon blade
+ Using that technique would be dangerous in such a context.
- What the fuck? You don't even know that technique! 

! talk white dog / talk tall dog / chat white dog / say to white dog
+ "You know i can understand what they're all saying in there. I can translate it to you, if you want."{+speak dog}

! listen / hear
+ Dogs and cats are chatting about that big hole that is underneath. Turns out that they were hiding it but now you are able to see it.

! what they say / what dog say / ask translation / translate dog
? speak dog
+ The tall dog with long hair points at one of the dogs with the tip of his nose. "Can you see the grey little one over there ? He was playing with his owner's bracelets and then, poof! He lost them. I bet he would be very grateful if you could bring them back to him."
- They're happily woofing together… But you can't understand what they're woofing about.

! give bracelets / grey dog / give bracelet
? bracelets
+ The grey puppy puts the bracelets around his tail and walks away, what a beautiful boy… He left something behind him, a red joysctick, ha has been detached from his original console {+joystick -> A red joystick}
- What are you tying to do ?


! pluck face into hole / face hole / see hole / look hole
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
 
! leave / go back
+ You are now in the main hall. {-fed by cat} {@🌈général}


# 🍽cafète
! look / observe
+ The room is very calm, somebody is taking a nap on the sofa next to a plant. The vending machines are making a purring noise.There is many corn flakes packs on the center table, and an itchy sponge laying by the sink.

! take glass
+ You have a glass {+glass taken -> A glass from the cafeteria}

! drop glass / put back glass
+ You put the glass back in its place {-glass taken}

! take itchy sponge / take old sponge / take sponge
? itchy sponge
+ You already have the itchy sponge.
- You have taken the itchy sponge. It's still wet, and a little bit stinky, but hey… It can be useful, somehow. {+itchy sponge -> An old, wet and itchy sponge}

! leave #🍽cafète/ leave cafet / leave / go back
? glass taken
+ You can't leave the cafeteria with a glass in your hands! You fool! It's too dangerous!
- You are now in the main hall. {@🌈général}

! wake up / wake up student / wake up sleeping student
? !fallen key
+ "Hey! Haven't you learned it's rude to wake up people?" They turn around and a small key falls down from the sofa.{+fallen key}
- You try waking up the student, but they just grumble as an answer.

! vending machine
+ The machine is half filled (or half empty?).But there are still some chocolate bars, chewing gums and chips. What would you like for a snack ? 

! chocolate bar
+ cling cling !! You just got a nice chocolate bar {+chocolate bar -> A chocolate bar from the vending machine}

! potato chips
+ cling cling !! You just got a nice bag of potato chips {+potato chips -> A sack of potato crisps}

! chewing-gums / chewing gum / chewing gums
+ cling cling !! You just got... Wait that's not my gum.. This machine just served you a great "magret de canard et ses oreilles d'oranges". The screen is boasting a 75€ bill. {+magret canard -> A "magret de canard et ses oreilles d'oranges"}


! take key / take the key
? fallen key
+ You now have the key on you! {+storage key -> The storage key}
- There is no key to be taken right now…


# 🥑bbq

! look / observe
+ There's a rusted bbq. Food is frying. A lot of people are chatting around, some of them have sandwiches. There's also a large table on which you can see some crisps, bread, salad, tomatoes, fried sausages and fried vegetables.

! say hi / say hello / say bonjour / say coucou / greet
+ As you say "hi", some people answer with hearty smiles.

! ask fire / demand fire / borrow fire / borrow lighter / ask lighter
? lighter
+ You already have a lighter, so no point in asking for another one.
- You approach a group of smoking students and ask for a lighter. One of them answers : “Well, sure! Take it, it's yours”, as they hand an old fire lighter over to you. You take it and thank them for their kindness. “It's nothing, really, I've been asking for lighters for years, now. I know how it feels!” {+lighter -> A given lighter}

! talk / chat
+ You really want to chat… but you can't think of anything to talk about right now.

! make sandwich / take sandwich / take food / prepare sandwich
? sandwich
+ You are already holding a sandwich. You are really voracious, aren't you?
- The smell of food is way too tempting. You get close to the table and start picking food to put in your sandwich. After a few meticulous choices, you end up with a beautiful and appetizing sandwich. It almost feels like art. {+sandwich -> A sandwich from the BBQ}

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
+ This is the courtyard of the school. A good amount of people are gathered around a flaming BBQ. Some of them are playing, some of them are chatting while smoking, and some of them are eating. {-helped}
? grate removed
+ On the ground, there's a storm drain. Its grate has been removed.
- On the ground, there's a grate protecting the storm drain.

! see grate / look grate / see drain / look drain / inspect grate / inspect drain
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
- You approach a group of smoking students and ask for a lighter. One of them answers : “Well, sure! Take it, it's yours”, as they hand an old fire lighter over to you. You take it and thank them for their kindness. “It's nothing, really, I've been asking for lighters for years, now. I know how it feels!” {+lighter -> A given lighter}

! enter drain / go to drain / go down / get down / enter stormdrain / go stormdrain
? grate removed
+ Now that the grate is removed, you can go down into the darkness below, deep inside the storm drain… After going down for a moment into the darkness, you finally perceive a glimmer of light. As you approach the light, you discover a very strange room… {@🧙♀le-petit-coin-sorcellerie} {+candles lit}
- The grate prevents you from going down.

! chat / talk / have conversation
+ You can't think of anything to talk about right now.

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
+ You are inside of a strange and rather dark room, in which a particular scent is floating. The inside is enlightened by the flames of many candles. It feels warm and cosy. There are cushions on the ground, withered plant bouquets and incens burners hanging on the roof. There is also a round table in the center of the room on which you can see many witchcraft-related items, such as sage sticks, stones and cristals marked with sigils, plants, a mortar and a pestle, vials, a tarot deck, a pendulum, and a ceremonial blade. You can notice a cauldron surrounded by salt on the ground at the back of the room and, of course, many shelves full of books.
- The room is completely obscure. You can't see anything right now.

! take candle / grab candle
? candles lit
+ The candles are lit. Your pocket would be burning if you took one in this state.
- Now that the candles are turned off, you manage to take one without getting burnt. {+candle -> A red candle}

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

! turn on candle / light candle / set candle fire / set fuse fire
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
- The vial is now taken. Are you looking for some potion crafting? {+vial -> A vial}

! mix / craft
? candles lit
+ What are you trying to mix together?
- You can't mix anything if there's no light!

! see book / inspect book / read book / see shelves / inspect shelves
? candles lit
+ Inspecting the shelves, a few books catch your attention : « Basics of witchcraft », « Sorcières : La puissance invaincue des femmes », « Alchimy, Ancient and Modern », « Astral Worship »
- You can't read anything if there's no light!

! read
? candles lit
+ Unfortunately, you can't find that book on the shelves…
- As far as you know, humans can't read into complete darkness, can they?

! read sorcières puissance femmes / read Sorcières : La puissance invaincue des femmes
? candles lit
+ « Qu’elles vendent des grimoires sur Etsy, postent des photos de leur autel orné de cristaux sur Instagram ou se rassemblent pour jeter des sorts à Donald Trump, les sorcières sont partout. Davantage encore queleurs aînées des années 1970, les féministes actuelles semblent hantées par cette figure. La sorcière est à la fois la victime absolue, celle pourqui on réclame justice, et la rebelle obstinée, insaisissable. Mais qui étaient au juste celles qui, dans l’Europe de la Renaissance, ont été accusées de sorcellerie ? Quels types de femme ces siècles de terreur ont-ils censurés, éliminés, réprimés ? Ce livre en explore trois et examine ce qu’il en reste aujourd’hui, dans nos préjugés et nos représentations : la femme indépendante – puisque les veuves et les célibataires furent particulièrement visées ; la femme sans enfant – puisque l’époque des chasses a marqué la fin de la tolérance pour celles qui prétendaient contrôler leur fécondité ; et la femme âgée – devenue, et restée depuis, un objet d’horreur. Enfin, il sera aussi question de la vision du monde que la traque des sorcières aservi à promouvoir, du rapport guerrier qui s’est développé alors tant à l’égard des femmes que de la nature : une double malédiction qui reste à lever. »
Sorcières : La puissance invaincue des femmes, Mona Chollet, 2018.
- You can't read anything if there's no light…

! read astral worship earth
? candles lit
+ *« The Earth.
Believing that the earth was the only world, that it was a vast circular plane, and that it was the fixed and immovable center around which revolved the celestial luminaries, the ancient Astronomers, in conformity to the requirement of the doctrine of future rewards and punishments, as inculcated in the Egyptian Version of the Exoteric Creed, divided it into an upper and an under, or nether world, which they connected by a sinuous and tenebrious passage. »*
- You can't read anything if there's no light…

! read astral worship firmament
? candles lit
+ *« The Firmament.
The azure dome, called the firmament in the book of Genesis, was believed to be a solid transparency, which we find described, in the fourth chapter and sixth verse, of that collection of Astronomical Allegories, called the Apocalypse, or Book of Revelation, “as a sea of glass like unto crystal.” It was represented as being supported by four pillars, resting upon the earth, one at each of the cardinal points, which were designated as “the pillars of heaven.” Conceiving the idea that there were windows in the firmament, the ancient Astronomers called them “the windows of heaven” and taught that they were opened when it rained, and closed when it ceased to rain. Hence it is evident that the ancient Astronomers did not refer to these pillars and windows in a figurative sense, but as real appurtenances to a solid firmament, as will be seen by reference to Gen. VII. 11, and VIII. 2, Job XXVI. 11, and Malachi III. 10.»*
- You can't read anything if there's no light…

! read astral worship planet / read astral worship planets
? candles lit
+ *« The Planets.
Believing that the stars were but mere flambeaux, suspended beneath the firmament, and revolving round the earth, for the sole purpose of giving it light and heat; and observing that seven of these, answering to the Sun, Moon, Mercury, Venus, Mars, Jupiter and Saturn, had perceptible movements, in relation to the other luminaries, the ancient astronomers designated them as planets or wandering stars.»*
- You can't read anything if there's no light…

! read astral worship constellation / read astral worship constellations
? candles lit
+ *« The Constellations.
Perceiving that the other celestial luminaries maintained the same relation to each other, and designating them as fixed stars, the ancient astronomers grouped those visible to them into forty−eight Constellations; and giving names to these, they also attached names to the stars of larger magnitude, which was done for the purpose of locating and distinguishing them with greater ease.»*
- You can't read anything if there's no light…

! read astral worship zodiac
? candles lit
+ *« The Zodiac.
Through twelve of these Constellations, mostly contained within a belt of 16 degrees in width, and within which the planets appeared to revolve, the ancient astronomers inscribed a central line representing the Ecliptic, or apparent orbit of the sun, which they divided into 360 degrees; and quartering these to denote the seasons, they named the cardinal points the Summer and Winter Solstices, and the Vernal and Autumnal Equinoxes; the former referring to the longest and shortest days of the year; and the latter to the two periods when the days and nights are equal. An abbreviatory sign having been attached to each of these constellations, the great celestial belt containing them was called “the wheel of the signs,” or “a wheel in the middle of awheel,” as designated by that old Astrologer, Ezekiel the Prophet, in chap. I. and 16th verse. But for the reason that, with only one exception, the forms of living things, either real or mythical, were given to them, this belt, ultimately, wad designated as the Zodiac; or Circle of living Creatures, see Ezekiel, chap. I. »*
- You can't read anything if there's no light…

! read astral worship
? candles lit
+ *« **THE GEOCENTRIC SYSTEM OF NATURE**
In constructing their system of nature, the ancient Astronomers constituted it of the Earth, the Firmament, the Planets, the Constellations and the Zodiac, and we will refer to them in the order named. »* There are several chapters you can read in this text: 
*The Earth.
The Firmament.
The Planets.
The Constellations.
The Zodiac.*
Astral Worship, J. H. Hill, 1895
- You can't read anything if there's no light…

! read alchimy / read Alchimy, Ancient and Modern
? candles lit
+ *« The Elixir of Life, which was generally described as a solution of the Stone in spirits of wine, or identified with the Stone itself, could be applied, so it was thought, under certain conditions to the alchemist himself, with an entirely analogous result, i.e., it would restore him to the flower of youth. The idea, not infrequently attributed to the alchemists, that the Elixir would endow one with a life of endless duration on the material plane is not in strict accord with alchemistic analogy. From this point of view, the effect of the Elixir is physiological perfection, which, although ensuring long life, is not equivalent to endless life on the material plane. "The Philosopher's Stone," says Paracelsus, "purges the whole body of man, and cleanses it from all impurities by the introduction of new and more youthful forces which it joins to the nature of man." And in another work expressive of the opinions of the same alchmist, we read "… there is nothing which might deliver the mortal body from death; but there is One Thing which may postpone decay, renew youth, and prolong short human life…" In the theory that a solution of the Philosopher's Stone (which, it must be remembered, was thought to be a species with gold) constituted the Elixir Vitæ, can be traced, perhaps, the idea that gold in a potable form was a veritable cure-all: in the latter days of Alchemy any yellow-coloured liquid was foisted upan a credulous public as a medicinal preparation of gold. »*
Alchimy, Ancient and Modern, H.Stanley Redgrove, 1922.
- You can't read anything if there's no light…

! read basics of witchcraft
? candles lit
+ It seems to be a book full of different recipies and guides for potion crafting, rituals, spells, and so on.
- You can't read without any light source.

! take sage stick
? !sage stick
+ You have taken the sage stick {+sage stick -> A sage stick}
- You already have one.

! leave / go back / go to cour
? !candles lit
+ By moving slowly and palpating the walls, you manage to get out of the completely dark room. {@🚬la-cour}
- You finally decide to go back to where you came from. {@🚬la-cour}


# 🤖mécatronique
! look
+ mecatronic.

! leave / go back / go to cour / go to courtyard
+ You decide to leave the workshop, going back to the courtyard. {@🚬la-cour}


# 🔩métal
! look / observe
? !radio down
+ There is very loud music coming from an small radio and huge machines are working. Some metal loss are covering the ground and just after the entrance door, there is a mysterious storage room, the door is closed. 
- There is no music coming from the small radio. Huge machines are working. Some metal loss are covering the ground and just after the entrance door, there is a mysterious storage room, the door is closed. 
? !master sword
+ There's a steel sword lying on a table.

! look sword / inspect sword / see sword
+ It is a well-made steel sword. 
? witch
+ With your skills as a witch, you can feel something within it. It is imbued with some sort of magic.

! take sword / grab sword
? !master sword
+ You have taken the sword. Could it have something special? {+master sword -> A sword that feels magical}
- You already have it.

! open door / open the door / unlock door
? storage key
+ You've unlocked the door, a gigantic white dog was stuck in there! he's wearing working gloves on his paws and can barely fit in this room. {+storage unlocked}
- The door is locked, you need to find the key…

! look dog
? storage unlocked ?
+ The white dog is the kind of dog you would like to talk with.
- Unfortunately, you can't see any dog in here.
 
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
! look
+ You have stept inside the drawing room. The room is plain white and it feels like a hospital. As you step in, a powerful light beam comes across your eyes and hits the inside of your cornea. The stroke was fatal.  Your eyes are closed now.

! open eyes    
+ ```
            * *      * _ _ _ *     * *
           *     *   /       \   *     *
          *       *  --------- *        *
         *          /         \        *
           * * * *  |---------|* * * * 
                    |---------|
                    |---------|   
                    \_________/```
                     
                                
       

# 🕸web

# 🕷sous-sol

! look / observe
+ This is the basement of the school. It's very dark and rather eerie. You can hear the sound of a few water drops hitting the ground from the roof. 
? candle lit
+ With the light of your candle, you are able to see some sort of ancient ruins. There's also a corridor leading to darkness straight ahead. There are pieces of spider webs hanging everywhere. 
- There's nothing much you can see through the darkness right now.
? spider present & !spider here
+ You can also hear some unusual sounds coming from something alive in this corridor.
? spider here
+ And, hum… Just in front of you… A giant spider staring at you.
? spider dead
+ The corpse of the spider you killed is lying on the ground.

> ! learn dragon blade
> + This is a cheat code. You know Dragon Blade technique, know. {+dragon blade}

! switch on light / turn on light / press light / press switch
+ You reach for a light switch and try pressing it… But the lights won't turn on.

! use phone / light phone / phone lamp
+ You thought you had a phone?

! turn on candle / fire candle / fire fuse / light candle
? candle
+ You take your own candle… 
- You don't have any candle.
? lighter
+ With your cigarette lighter, you finally manage to light up one candle. Now, you might be able to see through darkness. {+candle lit}
- But without anything to set the fuse on fire, it won't be of any use.

! blow candle / turn off candle
? candle & candle lit
+ You have blown your candle. {-candle lit}
? candle
- You don't have any candle.
? candle lit
- The fire is not lit anymore. 

! go ruins / see ruins / approach ruins / look ruins
? candle lit
+ You slowly approach the ruins. Most of it is burried in wet dust, rubbles and earth. The architecture looks like an old roman building, slowly falling appart. Is there anything in here? … Or anyone?
- You can't see any ruins. In fact, you can't see anything.

! search ruins / inspect ruins / find ruins / research ruins
+ You decide to spend some more time searching in the ruins. 
? candle lit & !spider dead
+ Your investigation is fruitless. You might want to try a few more times.
+ After a few moments of fruitless investigations, you foot bumps into something burried in the ground. Fortunately, you didn't fall. {+bumped into chest}
+ Not long after you started your research, you can hear some unusual noises coming from the long corridor. This makes you stop your searching. {+spider present}
? candle lit & spider dead
+ After a few moments of fruitless investigations, you foot bumps into something burried in the ground. Fortunately, you didn't fall. {+bumped into chest}
? !candle lit
+ Unfortunately… There is no light.

! hear / listen to
+ You remain silent for a moment.
? spider present
+ You can hear the noises of something alive in this place. You can't tell where it is… Nor how close it is from you.
- All you can hear is your own breathing and the plucking of water drops from the roof.

! shout / provoke / out loud / come at me / make noise
? spider present
+ As you make loud noise, you can feel a presence slowly getting closer to you. {+spider here}
- Your noise pierce through the grim silence. But no answer.
? candle lit
+ With the dancing flame of your candle, you are finally able to reveal the face of that presence. It is nothing less than a huge spider, as big as a car. Its hairy legs look deadly, and a putrid liquid is dripping from its jaws. The view is dreadful.


! search ground / dig / inspect ground
? candle lit
- You can't see a thing right now.
? bumped into chest
+ You decide to dig where your foot has just bumped into something. This is an old chest! {+found chest} 
- You try inspecting the ground… But you haven't found anything.

! open chest / inspect chest
? candle lit
- You can't see a thing.
? found chest
- There's no chest to open.
? !old cheese
+ Into the chest, there's… a very old and stinky cheese. In fact, this is the oldest cheese you have never seen in your entire life. More, this might be the oldest cheese on the world. Congratulations! {+old cheese -> The oldest cheese in the world}
- You already have taken the cheese. But, by looking closely, you discover a sub-fund. There's something else in this chest! Or not.


! cry for help / ask help / call for help / call unicorn
? spider here
+ You desperately cry for help…
- Why would you do that?
? unicorn fed
+ All of a sudden, a glimmering light appears and chases the darkness away! Frightened and screeching, the spider leaves. Right in front of you stands the unicorn you fed sooner with a sandwich. After giving you a look, it desapears in a myriad of light sparks. You have been saved. {-spider here} {-spider present} {-unicorn fed}
- But nothing happens.


! dragon blade / dragon sword / dragon blade! / dragon blade!!! / dragon blade!!
? dragon blade
- What the fuck, you don't even know that technique!
? sword drawn
+ Focused, you tighten your grasp on your sword. Its steel becomes red. You jump forward and raise your weapon. As fiery as the wrath of a dragon, your blade cut through the beasts's flesh in a single large slash, with a tremendous force. The spider crumbles in a painful screech, burning by the flames of your sword. It is dead. That's how you do it, pure and sheer brutality. Finesse is for loosers. {+spider dead} {-spider here} {-spider present}
- You attempt to use "Dragon Blade"… But your sword is not drawn.

! leave / go back
? !spider here
+ You leave it for now. {@🌈général}
<<<<<<< HEAD
- The spider prevents you from running away!
=======
- The spider prevents you from running away!
>>>>>>> c8c85ecb88976f8af7b73511f7e3e9366c724aa4
