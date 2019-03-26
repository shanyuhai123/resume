// 引入依赖
import Vue from "vue";
import html2canvas from "html2canvas";
import JsPDF from "jspdf";

const PDF = {};
// eslint-disable-next-line no-unused-vars
PDF.install = function(Vue, options) {
  Vue.prototype.$pdf = function(dom, user) {
    html2canvas(dom).then(canvas => {
      const [AWidth, AHeight] = [595.28, 841.89]; // a4
      let position = 0;
      let { width: CWidth, height: CHeight } = canvas;
      const PWidth = AWidth;
      const PHeight = (AWidth / CWidth) * CHeight;
      const jpeg = canvas.toDataURL("image/jpeg", 1.0);
      const doc = new JsPDF("", "pt", "a4");

      if (CHeight < PHeight) {
        doc.addImage(jpeg, "JPEG", 0, 0, PWidth, PHeight);
      } else {
        while (CHeight > 0) {
          doc.addImage(jpeg, "JPEG", 0, position, PWidth, PHeight);
          CHeight -= PHeight;
          position -= AHeight;
          if (CHeight > 0) {
            doc.addPage();
          }
        }
      }
      doc.save(user);
    });
  };
};

Vue.use(PDF);

export default PDF;
