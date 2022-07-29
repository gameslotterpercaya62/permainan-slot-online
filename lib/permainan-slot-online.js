'use babel';

import PermainanSlotOnlineView from './permainan-slot-online-view';
import { CompositeDisposable } from 'atom';

export default {

  permainanSlotOnlineView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.permainanSlotOnlineView = new PermainanSlotOnlineView(state.permainanSlotOnlineViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.permainanSlotOnlineView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'permainan-slot-online:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.permainanSlotOnlineView.destroy();
  },

  serialize() {
    return {
      permainanSlotOnlineViewState: this.permainanSlotOnlineView.serialize()
    };
  },

  toggle() {
    console.log('PermainanSlotOnline was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
