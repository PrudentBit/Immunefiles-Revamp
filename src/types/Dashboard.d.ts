type UserDashDetails = {
  favourite_group: any[],
  critical_links: {
    name: string,
    urlhash: string
  }[],
  links: {
    overall: {
      total: number,
      active: number,
      expired: number
    }
  },
  storage: {
    storage_used: number,
    total_storage: number,
    perecentage: {
      media: string,
      docs: string,
      images: string,
      others: string
    }
  }
}
