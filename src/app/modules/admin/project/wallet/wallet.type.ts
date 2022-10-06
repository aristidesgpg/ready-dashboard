export interface FaqCategory
{
    id: string;
    slug: string;
    title: string;
    faqs?: Faq[];
}

export interface Faq
{
    id: string;
    categoryId: string;
    question: string;
    answer: string;
}
