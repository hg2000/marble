/**
 * Routes Events to concrete methods
 */
export default class EventRouter {

  constructor(container, setup) {
    this.container = container
    this.setup = setup
  }

  route() {
    this.stageEvents()
    this.controlsEvents()
    this.directorEvents()
    this.canvasEvents()
  }

  stageEvents() {
    let container = this.container
    container.stageUi.Observable.addObserver(function (args) {
      container.director.startDrawBar(args.x, args.y)
    }, 'onStartDrawBar')

    container.stageUi.Observable.addObserver(function (args) {
      container.director.stopDrawBar(args.x, args.y)
    }, 'onStopDrawBar')

    container.stageUi.Observable.addObserver(function (args) {
      container.director.drawBar(args.x, args.y)
    }, 'onMouseMove')
  }

  controlsEvents() {
    let container = this.container
    container.controls.Observable.addObserver(function (args) {
      container.director.changeObjectProperty(args.entity, args.property, args.value)
      container.controls.updateControl(args.property, args.value)
    }, 'onControlsUpdate')
  }

  canvasEvents() {
    let container = this.container
    container.canvas.Observable.addObserver(function (args) {
      container.director.updateCanvasSize(args.width, args.height)
    }, 'onCanvasResize')

    container.director.Observable.addObserver(function (args) {
      container.director.mouseDown(args.x, args.y)
    }, 'onMouseDown')

    container.director.Observable.addObserver(function (args) {
      container.director.mouseUp(args.x, args.y)
    }, 'onMouseUp')

    container.director.Observable.addObserver(function (args) {
      container.director.mouseMove(args.x, args.y)
    }, 'onMouseMove')
  }

  directorEvents() {
    let container = this.container
    let setup = this.setup

    container.director.Observable.addObserver(function (args) {
      container.controls.updateControl(args.property, args.value)
    }, 'onSelectBar')

    if (setup.mode.test) {
      container.director.Observable.addObserver(function (args) {
        container.collisionTest.next(container.director)
      }, 'onInit')

      container.director.Observable.addObserver(function (args) {
        container.collisionTest.next(container.director)
      }, 'onCollision')
    }
  }
}