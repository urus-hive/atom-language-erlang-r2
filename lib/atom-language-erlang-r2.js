'use babel';

import AtomLanguageErlangR2View from './atom-language-erlang-r2-view';
import { CompositeDisposable } from 'atom';

export default {

  atomLanguageErlangR2View: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomLanguageErlangR2View = new AtomLanguageErlangR2View(state.atomLanguageErlangR2ViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomLanguageErlangR2View.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-language-erlang-r2:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomLanguageErlangR2View.destroy();
  },

  serialize() {
    return {
      atomLanguageErlangR2ViewState: this.atomLanguageErlangR2View.serialize()
    };
  },

  toggle() {
    console.log('AtomLanguageErlangR2 was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
