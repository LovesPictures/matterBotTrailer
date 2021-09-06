/* main text */

// values to keep track of the number of letters typed, which quote to use. etc. Don't change these values.
var i = 0,
  a = 0,
  isBackspacing = false,
  isParagraph = false;

// Typerwrite text content. Use a pipe to indicate the start of the second line "|".
var textArray = [
  "Start ",
  "How to use;  |★ View on a mobile    |★ audio button for audio of the text    |★ or follow the text as it appears    |★ Duration; 5:30 minutes ",   
 

  
  "Hello, my name is Judith Ricketts  " ,
  "I am an Artist, a Serious Games Developer and a Lecturer in digital media arts. ",
  "My practice is thematically centred on the spatial memory of the city’s built environment | I see the city as an intersectional backdrop, a fascinating place to examine data related to the gaze        ", 
  "that is, human-to-human looking, | and by extension, machines that see.        ",
  "    ",
  "Questions raised in my practice relate to ways human-computer interaction | can be used as a creative tool to engage audiences with difficult subjects.        ",
  "    ",
  "I make media artefacts designed to disrupt, raise questions, and to reshape | the boundaries of media conventions and narratives which exclude.        ",
  "    ",
  "This work is a trailer for matterBot; a curated selection of granular social media data | presented in the form of an interactive chatbot. ",
  "due for completion in 2022.        ", 
  "    ", 
  "matterBot will be designed for the democratic distribution of information to empower individuals or groups.        ", 
  "it’s purpose is to create meaningful real-world conversations, and to promote positive action for social change.        ", 
  "The content of the work seeks to contextualise preceding historical periods | which lead to the casual murder of George Floyd on Monday 25th May 2020.        ",
  "the media experience includes a rich mixture of still images, moving image, text and data        ",
  "whilst it touches on the resurgence of international activism and protest.         ",
  "the work concludes with a call-to-action in the form social media hashtags.         ",
  "    ",
  "My challenge to you:         | How does your work challenge or subvert narratives designed to exclude? and how could you illustrate this visually?        ",
 "In addition you can use any natural language totalling < 900 characters to describe your approach.     ",
 "Thank you.    ",
  "end. ",



/* 
This chatbot is deinged for the democratic dissemination of information to empower individuals and to promote positive social change. 

I tell stories between the spaces of; historic narrative, computer science, digital geographies, digital humanities, and the built environment using archival data.

MatterBot is a curated selection of social media, a bespoke interactive work in the chatbot aesthetic designed to create meaningful real-world conversations and actions for positive social.  

This work seeks to contextualise the preceding centuries which lead to the death of George Floyd Monday 25th May 2020.  Following which, it touches on the subsequent resurgence of the Black Lives Matter movement and culminates in a call-to-action for the user, presented in the form of subject related hashtags.


  "What do you call a fake noodle?|An Impasta",
  "Why shouldn't you write with a broken pencil?|Because it's pointless",
  "Why couldn't the pirate finish the alphabet?|He kept getting lost a C",
  "What's brown and sticky?|A stick",
  "What starts with an E, ends with an E and has one letter in it?|An Envelope",
  "What has four wheels, and flies?|A Garbage truck",
  "What do you call a pig that knows Karate?|Pork Chop",
  "Why did the scarecrow get promoted?|He was out standing in his field.",
  "I have a step ladder|I never knew my real ladder.",
  "What kind of shoes do ninjas wear?|Sneakers"
  
  */
];

// Speed (in milliseconds) of typing.
var speedForward = 100, //Typing Speed
  speedWait = 2000, // Wait between typing and backspacing
  speedBetweenLines = 1000, //Wait between first and second lines
  speedBackspace = 25; //Backspace Speed

//Run the loop
typeWriter("output", textArray);

function typeWriter(id, ar) {
  var element = $("#" + id),
    aString = ar[a],
    eHeader = element.children("h1"), //Header element
    eParagraph = element.children("p"); //Subheader element

  // Determine if animation should be typing or backspacing
  if (!isBackspacing) {
    // If full string hasn't yet been typed out, continue typing
    if (i < aString.length) {
      // If character about to be typed is a pipe, switch to second line and continue.
      if (aString.charAt(i) == "|") {
        isParagraph = true;
        eHeader.removeClass("cursor");
        eParagraph.addClass("cursor");
        i++;
        setTimeout(function () {
          typeWriter(id, ar);
        }, speedBetweenLines);

        // If character isn't a pipe, continue typing.
      } else {
        // Type header or subheader depending on whether pipe has been detected
        if (!isParagraph) {
          eHeader.text(eHeader.text() + aString.charAt(i));
        } else {
          eParagraph.text(eParagraph.text() + aString.charAt(i));
        }
        i++;
        setTimeout(function () {
          typeWriter(id, ar);
        }, speedForward);
      }

      // If full string has been typed, switch to backspace mode.
    } else if (i == aString.length) {
      isBackspacing = true;
      setTimeout(function () {
        typeWriter(id, ar);
      }, speedWait);
    }

    // If backspacing is enabled
  } else {
    // If either the header or the paragraph still has text, continue backspacing
    if (eHeader.text().length > 0 || eParagraph.text().length > 0) {
      // If paragraph still has text, continue erasing, otherwise switch to the header.
      if (eParagraph.text().length > 0) {
        eParagraph.text(
          eParagraph.text().substring(0, eParagraph.text().length - 1)
        );
      } else if (eHeader.text().length > 0) {
        eParagraph.removeClass("cursor");
        eHeader.addClass("cursor");
        eHeader.text(eHeader.text().substring(0, eHeader.text().length - 1));
      }
      setTimeout(function () {
        typeWriter(id, ar);
      }, speedBackspace);

      // If neither head or paragraph still has text, switch to next quote in array and start typing.
    } else {
      isBackspacing = false;
      i = 0;
      isParagraph = false;
      a = (a + 1) % ar.length; //Moves to next position in array, always looping back to 0
      setTimeout(function () {
        typeWriter(id, ar);
      }, 150);
    }
  }
}

// play pause button --------/

var track = document.getElementById('track');

var controlBtn = document.getElementById('play-pause');

function playPause() {
    if (track.paused) {
        track.play();
        //controlBtn.textContent = "Pause";
        controlBtn.className = "pause";
    } else { 
        track.pause();
         //controlBtn.textContent = "Play";
        controlBtn.className = "play";
    }
}

controlBtn.addEventListener("click", playPause);
track.addEventListener("ended", function() {
  controlBtn.className = "play";
});

/* end main text */