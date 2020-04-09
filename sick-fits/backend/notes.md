# Module 3  
## Add a new type:  
   
   1. Add it to your data model (`datamodel.graphql`)  
   2. We have to deploy it to the Prisma Service (that also pull `prisma.graphql`, which contains all the queries and mutations).  
   3. `Schema.graphql` => our public facing API (our react app will interact with it).  
       To match up with these mutations and queries => we need to write our customer resolvers for them (complete all the logic).
       
       
# Module 4
Apollo Client: piece to connect our front (react.js) with out backend (graphql yoga + prisma): 
- Will replace the need for using something like Redux because Apollo does all of the data manager stuff (+ other things: fetching data...). 
