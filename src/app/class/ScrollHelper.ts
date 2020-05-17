export class ScrollHelper {
  private classToScrollTo: string = null;

  scrollToFirst(className: string) {
    this.classToScrollTo = className;
  }

  doScroll() {
    if (!this.classToScrollTo) {
      return;
    }
    try {
      const elements = document.getElementsByClassName(this.classToScrollTo);
      if (elements.length === 0) {
        return;
      }
      elements[0].scrollIntoView();
    }
    finally {
      this.classToScrollTo = null;
    }
  }
}
