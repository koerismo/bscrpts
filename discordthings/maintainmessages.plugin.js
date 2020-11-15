//META{"name":"Nothing","website":"https://github.com/Mega-Mewthree/BetterDiscordPlugins/Plugins/Nothing","source":"https://github.com/Mega-Mewthree/BetterDiscordPlugins/Plugins/Nothing/Nothing.plugin.js"}*//

class Nothing {
  getName() {return 'MaintainMessagesV1'}
  getShortName() {return 'MtMsgV1'}
  getDescription() {return 'A small plugin to show when messages are edited or deleted.'}
  getVersion() {return '0.1'}
  getAuthor() {return 'Unknown'}
  constructor() {}

  load() {}
  unload() {}
  start() {BdApi.injectCSS('0',`
div.modifiedMessage {
/*padding: 1px 0 1px 5px !Important;*/
margin: 5px 0px !Important;
/*margin-left: 72px !important;*/
border-left: 5px solid !important;
border-radius: 5px;
width: fit-content;
}

div.editedMessage {
background: rgba(255, 188, 0, 0.15);
border-left: 5px solid #ffe000;
}

div.deletedMessage {
background: rgba(255, 0, 0, 0.15);
border-left: 5px solid #f22 !Important;
}
  `)}
  stop() {BdApi.clearCSS('0')}
  onSwitch() {
    console.warn('PLUGIN!!! SWITCHING CHANNELS!!!')
  }
  onMessage() {
    console.warn('PLUGIN!!! NEW MESSAGE!!!')
  }
  observer(x) {
    if (x.target == $('.da-scrollerInner')[0]) {
      if (x.removedNodes.length) {
        if (x.addedNodes.length || !x.removedNodes[0].classList.contains('da-message') || $('.da-isSending',x.removedNodes[0]).length)
          return
        console.log('Removed messages:')
        let rmd = x.removedNodes.length
        while (rmd--) {
          let cnode = x.removedNodes[rmd]
          console.log('> '+cnode.innerText)
        }
        this.MAMS_reattach(x)
      }
    }
    if (x.target.classList.contains('da-markup')) {
      console.log('EDIT EVENT!!',x)
    }
  }
  MAMS_reattach(ev) {
    /* Assume that an event can only delete one message at a time. This is a bad idea, but I'll do it anyways. */
    let oldel = ev.removedNodes[0]
    $('.da-scrollerInner')[0].insertBefore(oldel,ev.nextSibling)
    oldel.classList.add('modifiedMessage')
  	oldel.classList.add('deletedMessage')
  }
}
