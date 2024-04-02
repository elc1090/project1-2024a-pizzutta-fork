const Signature = class {

  type = "";

  canvas = $('#signatureCanvas')[0];
  ctx = this.canvas.getContext('2d');

  position = {x: 0, y: 0};
  painting = false;

  initialize = () => {
    $(window).on("load", () => {
      $(this.canvas).mousedown(this.startPainting)
      $(this.canvas).mouseup(this.stopPainting)
      $(this.canvas).mousemove(this.sketch)

      $(this.canvas).on("touchend", (event) => this.handleTouch(event, "mouseup"))
      $(this.canvas).on("touchstart", (event) => this.handleTouch(event, "mousedown"))
      $(this.canvas).on("touchmove", (event) => this.handleTouch(event, "mousemove"))

      $('#signatureField').change(() => {
        const file = $('#signatureField').prop("files")[0]
        const reader = new FileReader();
        if (file) {
          reader.readAsDataURL(file)
          reader.addEventListener("load", () => {
            $('#signaturePreview').attr("src", reader.result)
            $('#signaturePreview').show()
          }, false);
        }
      })
    });
  }

  handleSignatureTypeChange = () => {
    this.type = $('input[name=signatureType]:checked').val()
    switch (this.type) {
      case "DRAW": {
        $('#signatureCanvasWrapper').show()
        $('#signatureSelect').hide()
        break;
      }
      case "SELECT": {
        $('#signatureSelect').show()
        $('#signatureCanvasWrapper').hide()
        break;
      }
    }
  }

  handleTouch = (event, type) => {
    event.preventDefault()
    const touch = event.touches[0]
    const mouseEvent = new MouseEvent(type, {
      clientX: touch.clientX,
      clientY: touch.clientY
    })
    this.canvas.dispatchEvent(mouseEvent)
  }

  getSignatureImage = () => {
    switch (this.type) {
      case "DRAW": {
        return this.canvas.toDataURL("image/png")
      }
      case "SELECT": {
        return $('#signaturePreview').attr("src")
      }
    }
  }

  getPosition = (event) => {
    this.position.x = event.clientX - this.canvas.getBoundingClientRect().left;
    this.position.y = event.clientY - this.canvas.getBoundingClientRect().top;
  }

  startPainting = (event) => {
    this.painting = true;
    this.getPosition(event);
  }

  stopPainting = () => {
    this.painting = false;
  }

  sketch = (event) => {
    if (!this.painting) return;

    this.ctx.beginPath();
    this.ctx.lineWidth = 2;
    this.ctx.lineCap = "round";
    this.ctx.strokeStyle = "black";

    this.ctx.moveTo(this.position.x, this.position.y);
    this.getPosition(event);
    this.ctx.lineTo(this.position.x, this.position.y);
    this.ctx.stroke();
  }

  clearCanvas = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  clearPreview = () => {
    $('#signaturePreview').attr("src", "#")
  }

  isBlank = () => {
    return !this.ctx
      .getImageData(0, 0, this.canvas.width, this.canvas.height).data
      .some(channel => channel !== 0);
  }
}
