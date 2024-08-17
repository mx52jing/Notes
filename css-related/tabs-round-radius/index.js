const $ = (selector, all) => {
    return document[`${all ? "querySelectorAll" : "querySelector"}`](selector)
}
const tabs = ["投研观点", "动态", "财富课堂"]

const generateEl = () => {
    const html = `
       <div class="tabs-box">
            ${tabs.map((item, index) => (
                `<div class="tabs-item ${index === 0 ? "tabs-item--selected" : ''}">${item}</div>`    
            )).join("")}
       </div>
    `
    return html
}

window.onload = () => {
    const rootEl = $("#app")
    const el = generateEl();
    rootEl.insertAdjacentHTML("beforeend", el)
    const tabItems = $(".tabs-item", true)
    tabItems.forEach((el) => {
        el.onclick = () => {
            tabItems.forEach(otherEl => otherEl.classList.remove("tabs-item--selected"))
            el.classList.add("tabs-item--selected")
        }
    })
}