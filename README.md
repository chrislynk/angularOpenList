# Overview
A basic Angular list that is open enough to expand. Included find a basic PHP CRUD API, a "dashboard" (a list of lists), and a "list" app.  Finally, a simple breadcrumb 'navigation' app provides browserless navigation.
## Open How
A **Title** is a bit of information, the simplest, most direct way to refer to something. Think of a title as a descriptive heading. Titles are also treated like folders when grouped into a collection. The next bit of information we need is **Template**. The ‘template’ field tells us something about what data to expect and how to present it. Finally, all we need is **Content**, or the actual list. So, **Info** is content with title and a template. `{title:<string>, template:<see below>, <JSON>, updates:<datetime>, created:<datetime>}`
### Templates
To begin we start with a **List**, a basic Template as simple as a comma separated list (a.k.a. a string array). Together these three concepts (title, template and content) can represent a meaningful unit of information. List is just an app but it's the basis for the other templates. It's functions are inheritable. 

- [x] **List**: a Title with a list (array of str) `[<string>, ...,<string>]`
  - [ ] **Dictionary**: a List of Unique strings each with a definition (obj of str) 
`{<term>:<string>, ... }`
  - [ ] **Rating**: a List of Unique strings each with a rating (obj of num) 
`{<description>:<int>, ... }`
  - [ ] **Checklist**: a List of Unique strings each with a checkbox. (obj of bool) 
`{<description>:<bool>, ... }`
  - [ ] **Table**: a List by Template created with a list of inputs (arr of obj). 
`[{<col>:<value>, ... } ... ]`
  - [ ] **Tracker**: a List of Unique dates each with an entry (date-str indexed obj  of data) 
`{<date-str>:<str/num/obj>, ... }`
- [ ] **Page**: a Title (page title) with a body represented as a hierarchical list and/or <html> 
`[<list>,...] or <html>`
  - [ ] **Post**: A Page with a Date
  - [ ] **Wiki**: A Page with pages
- [ ] **Collection**: a Title with a hierarchical list of Lists `[<list_Id>, ...]` 
  - [ ] **Dashboard**: a Collection of Lists
    - [ ] **Project**: a Consolidation of Checklists. 
    - [ ] **Trail**: a Consolidation of trackers. 
    - [ ] **Venn**: a Consolidation of Lists based on common entries
  - [ ] **Library**: a Collection of Pages
  
# Backen API & Database'
The backend **C**reate, **R**ead, **U**ptate, **D**elete (**CRUD**) is intentionally as simple as possible. The traditional LAMP (Lynux, Apache, MySQL, PHP) is used; However the MySQL database is treated more like a Mongo type document database. There are only 3 signicican fields - Title, Template, and Content (id and a smattering of dates are also present).
- **create.php**: Accepts *title* or *title* and *template* (defaults to "List"). Returns created *info* with no content (id, title, and template only). 
  - `addInfo(title: string, template: string = "List"): Observable<Info[]>`
- **read.php**: Defaults to "*SELECT \*  FROM information*". Also accepts *template* (returns all matching entries), *title* & *template* (ensures a uniqu match), or *id*. Returns either a single *info* or an array of *info*s (*information*).
  - `getAll(): Observable<Info[]>` 
  - `getTemplates(template: string): Observable<Info[]>` 
  - `getId(id: number): Observable<Info>` 
  - `getTitle(title: string, template: string): Observable<Info>`
- **update.php**: Uses *json_decode* to read *$poostdata* and expects relevant fields *id*, *title*, *content*, and *template*. Only returns 'ok'.
  - `updateInfo(info: Info): Observable<Info[]>`
- **delete.php**: Expects *id* and checks if that id exists. Only returns 'ok'
  - `deleteInfo(id: number): Observable<Info[]>`
