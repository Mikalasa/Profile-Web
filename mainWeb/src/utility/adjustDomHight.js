export function adjustParentHeight() {
    const parent = document.querySelector('.projects-container');
    if (!parent) return;
    const children = parent.children;
    let totalHeight = 0;
    for (const child of children) {
        totalHeight += child.offsetHeight;
    }
    parent.style.height = `${totalHeight}px`;
}
