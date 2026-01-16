//https://rahulshettyacademy.com/angularpractice/

// Playwright special locators

// getByLabel
// Text inside a label tag, that is radio and checkbox
// page.getByLabel('')
// For radio and checkbox we can use check() instead of click()
// For Dropdown and options within select tag
// page.getByLabel('Gender').selectOption('Female')

// getByPlaceholder
// by giving placeholder value
// page.getByPlaceholder()

// getByRole Syntax : getByRole("role",{name:"NAME"})
// playwright support many roles like 
// getByRole(role: "alert"|"alertdialog"|"application"|"article"|"banner"|"blockquote"|"button"|
// "caption"|"cell"|"checkbox"|"code"|"columnheader"|"combobox"|"complementary"|"contentinfo"|
// "definition"|"deletion"|"dialog"|"directory"|"document"|"emphasis"|"feed"|"figure"|"form"|
// "generic"|"grid"|"gridcell"|"group"|"heading"|"img"|"insertion"|"link"|"list"|"listbox"|
// "listitem"|"log"|"main"|"marquee"|"math"|"meter"|"menu"|"menubar"|"menuitem"|"menuitemcheckbox"|
// "menuitemradio"|"navigation"|"none"|"note"|"option"|"paragraph"|"presentation"|"progressbar"|"radio"|
// "radiogroup"|"region"|"row"|"rowgroup"|"rowheader"|"scrollbar"|"search"|"searchbox"|"separator"|
// "slider"|"spinbutton"|"status"|"strong"|"subscript"|"superscript"|"switch"|"tab"|"table"|"tablist"|
// "tabpanel"|"term"|"textbox"|"time"|"timer"|"toolbar"|"tooltip"|"tree"|"treegrid"|"treeitem", 
// options?: {
// getByRole("button", {name: 'Submit'}).click()
// here it filters all button and then write name of that button, name is nothing but value/text on the button

// getByText
// expect(await page.getByText('Success! The Form has been submitted successfully!.').isVisible()).toBeTruthy()
// page.locator('app-card').filter()
// app-card returned a list of elements and on that we can apply filter method
// filter has few options
// 1. has 2.hasNot 3.hasText 4.hasNotText
// tell to click on app-card which has Nokia Edge
// hasText will apply getByText method on app-card
// now we reached nokia edge now click on add by using getByRole by chaining
// ie page.locator('app-card').filter({hasText:'Nokia Edge'}).getByRole('button')
// here getByRole has no argumnet like {name:'Add'} bcz there is only one button in this chaining

// What to use getByLocators or locators(CSS,xpath) totally depends on project
// choose one to maintain consistency
