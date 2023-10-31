export interface ILayout {
    children: React.ReactNode,
};

export interface IAd {
    id: number,
    title: string,
    description: string,
    owner: string,
    price: number,
    picture: string,
    location: string,
    createdAt: string,
};

export interface ICreateAd {
    title: string,
    description: string,
    owner: string,
    price: number,
    picture: string,
    location: string,
}

