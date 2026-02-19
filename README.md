# Goal

Build a Pokemon gallery that looks like the reference provided.

# Data

You can find the data at https://pokeapi.co/

Write a script to fetch the data yourself. It will require multiple fetches and
you will have to write some sort of script to pause between each request so as
to not go over the rate limit.

# Suggestions

To start with, hard code the data for a single pokemon, design the card, copy
paste and see how the whole thing looks. Once you are satisfied, you should
ideally _automate_ the process of generating a page. This can be done with Deno
of course(there are other ways too, using sed/jq and shell scripting for
instance).

# Colors.

You may choose your own colors, but I've provided the colors I've used in
`colors.css`

# Hosting

Host it on github pages. Please use an `index.html` as your entry point. Keep
any files that are not html, css or images in a separate branch or a repo as if
you host those files, they will become available online too.
