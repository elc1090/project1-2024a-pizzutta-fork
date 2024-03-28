const Signature = class {

  canvas = $('#signatureCanvas')[0];
  ctx = this.canvas.getContext('2d');

  position = {x: 0, y: 0};
  painting = false;

  initialize = () => {
    $(window).on("load", () => {
      $(this.canvas).mousedown(this.startPainting)
      $(this.canvas).mouseup(this.stopPainting)
      $(this.canvas).mousemove(this.sketch)

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
}
