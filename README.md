# Overview
A basic Angular list that is open enough to expand. Included find a basic PHP CRUD API, a "dashboard" (a list of lists), and a "list" app.  Finally, a simple breadcrumb 'navigation' app provides browserless navigation.
## Open How
A **Title** is a bit of information, the simplest, most direct way to refer to something. Think of a title as a descriptive heading. Titles are also treated like folders when grouped into a collection. The next bit of information we need is **Template**. The ‘template’ field tells us something about what data to expect and how to present it. Finally, all we need is **Content**, or the actual list. So, **Info** is content with title and a template. `{title:<string>, template:<see below>, content:<JSON>, updates:<datetime>, created:<datetime>}`
### Templates
To begin we start with a **List**, a basic Template as simple as a comma separated list (a.k.a. a string array). Together these three concepts (title, template and content) can represent a meaningful unit of information. List is just an app but it's the basis for the other templates. It's functions are inheritable. 

- [x] **List**: a Title with a list (array of str) `content:[<string>, ...,<string>]`
  - [ ] **Dictionary**: a List of Unique strings each with a definition (obj of str) 
`content:{<term>:<string>, ... }`
  - [ ] **Rating**: a List of Unique strings each with a rating (obj of num) 
`content:{<description>:<int>, ... }`
  - [ ] **Checklist**: a List of Unique strings each with a checkbox. (obj of bool) 
`content:{<description>:<bool>, ... }`
  - [ ] **Table**: a List by Template created with a list of inputs (arr of obj). 
`content:[{<col>:<value>, ... } ... ]`
  - [ ] **Tracker**: a List of Unique dates each with an entry (date-str indexed obj  of data) 
`content:{<date-str>:<str/num/obj>, ... }`
- [ ] **Page**: a Title (page title) with a body represented as a hierarchical list and/or <html> 
`content:[<list>,...] or content:<html>`
  - [ ] **Post**: A Page with a Date
  - [ ] **Wiki**: A Page with pages
- [ ] **Collection**: a Title with a hierarchical list of Lists `content:[<list_Id>, ...]` 
  - [ ] **Dashboard**: a Collection of Lists
    - [ ] **Project**: a Consolidation of Checklists. 
    - [ ] **Trail**: a Consolidation of trackers. 
    - [ ] **Venn**: a Consolidation of Lists based on common entries
  - [ ] **Library**: a Collection of Pages
  
