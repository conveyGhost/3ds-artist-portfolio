import items from './items.js'
import items_v from './items_v.js'
import tags from './tags.js'
import Experience from '../../Experience.js'

export default class WorkRender {

    domElements = {
        renderContainer: document.getElementById('work-render-container')
    }

    constructor() {
        this.experience = new Experience()
        this.sounds = this.experience.sounds

        this.items = items
        this.items_v = items_v
        this.tags = tags

        this.renderItems()
    }

    renderItems() {
        this.items.forEach((item) => {
            this.domElements.renderContainer.insertAdjacentHTML('beforeend', `
            <div id="work-item-${item.id}" class="work-item-container column">
            ${item.image ? `<img src="${item.image}" alt="${item.alt}" height="auto" width="100%"/>` : `<video src="${item.video}" controls height="auto" width="100%"></video>`}
                <div class="work-item-content-container">
                    <h3>${item.name}</h3>
                    <div class="work-item-tag-container row">
                        ${this.renderTags(item.tags)}
                    </div>
                    <span>${item.description}</span>
                </div>
                <div class="work-item-button-container row">
                    ${this.renderButtons(item)}
                </div>
                ${item.bannerIcons ? this.renderBanner(item) : ''}
            </div>
            `)

            this.addEventListenersToCard(item)
        })
    }


    renderBanner(item) {
        let content = ''

        content = `
            <div class="work-banner-container row center">
                ${item.bannerIcons.map(icon => {
            return `<img src="${icon.src}" alt="${icon.alt}" height="64" width="64"/>`
        })}
                <span>Website Of<br>The Day</span>
            </div>
        `

        return content
    }

    renderButtons(item) {
        let content = ''

        if (item.github) {
            content = `
                <div id="work-item-gray-button-${item.id}" class="work-item-gray-button center gray-hover" ${item.liveview ? '' : 'style="width: 100%"'}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"  class="code-icon">
                        <use href="#code-path"/>
                    </svg>
                 ${item.liveview ? '' : '<span></span>'}
                </div>                 
            `
        } else if (item.liveview) {
            content = `${item.liveview ? `<div id="work-item-orange-button-${item.id}"></div>` : ''}`
        } else {
            content = `
                <div id="work-item-gray-button-${item.id}" class="work-item-gray-button center" style="width: 100%; background: #a7adb8; cursor: unset;">
                    Work in progress
                </div>
            `
        }

        return content
    }

    renderTags(tags) {
        let contentToReturn = ''

        //get requested tag from tags.js file
        for (let i = 0; i < tags.length; i++) {
            contentToReturn += this.tags[tags[i]]
        }

        return contentToReturn
    }


    addEventListenersToCard(item) {
        const container = document.getElementById('work-item-' + item.id)

        // Inactive Container click
        container.addEventListener('click', () => {
            if (container.classList.contains('work-inactive-item-container') && document.getElementById('work-item-0').classList.contains('work-item-container-transition')) {
                this.experience.ui.work.cards.currentItemIndex = -item.id + 4
                this.experience.ui.work.cards.updatePositions()
                this.sounds.play('buttonClick')
            }
        })

        if (item.github) {
            // Gray button click
            document.getElementById('work-item-gray-button-' + item.id).addEventListener('click', () => {
                window.open(item.github, '_blank').focus()
            })
        } else if (item.twitter) {
            // orange button click
            document.getElementById('work-item-orange-button-' + item.id).addEventListener('click', () => {
                window.open(item.twitter, '_blank').focus()
            })
        }
        // orange button click
        else if (item.liveview) {
            document.getElementById('work-item-orange-button-' + item.id).addEventListener('click', () => {
                window.open(item.liveview, '_blank').focus()
            })
        }
    }
} 