interface CategoriesClasses {
    [x: string]: string
}

export class Render {
    
    private categoriesClasses: CategoriesClasses = {
        'другое': 'card__category_other',
        'софт-скил': 'card__category_soft',
        'хард-скил':'card__category_hard',
        'кнопка': 'card__category_button',
        'дополнительное': 'card__category_additional'
    }

    renderList<ArrayItem>(
        array: ArrayItem [], 
        element: (arrayItem: ArrayItem, index?: number) => HTMLElement ,
        container: HTMLElement,
        eventListener?: (tag: HTMLElement, arrayItem: ArrayItem) => void
    ) {
        array.forEach((arrayItem,index)=> {
            const HtmlElement = element(arrayItem, index + 1)
            
            if(eventListener) {
                eventListener(HtmlElement, arrayItem)
            }
            container.append(HtmlElement)
        })
    }

    setProductPrice(price:number|null) {
        return  price ? `${price} синопсов` : 'Бесценно'
    }


    getCategoryClass(category: string): string {
        return this.categoriesClasses[category] || ''
    }

    setSrcImage(image:HTMLImageElement, url:string) {
        import(`/src/images/cards${url}`).then(imagePath => {
            image.setAttribute('src', imagePath.default);
        }) 
    
    }
}



