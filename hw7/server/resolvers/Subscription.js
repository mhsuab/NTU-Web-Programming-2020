const Subscription = {
  message: {
    subscribe(parent, args, { pubsub }, info) {
      return pubsub.asyncIterator('message')
    }
  }
}

export { Subscription as default }
