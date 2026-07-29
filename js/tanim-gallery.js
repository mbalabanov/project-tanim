/**!
 * tanim-gallery.js — zoom and navigate the Tanim comic page thumbnails
 * Author: Marin Balabanov
 *
 * Every thumbnail with the "tanim-thumb" class becomes a zoom-in trigger for
 * a shared modal. Once open, Previous/Next buttons and the left/right arrow
 * keys step through every page on the current part in reading order, so a
 * reader can flip through the whole gallery without closing the modal.
 */
(function () {
  "use strict";

  var thumbs = Array.prototype.slice.call(
    document.querySelectorAll("img.tanim-thumb")
  );
  var modalEl = document.getElementById("tanimPageModal");
  if (!thumbs.length || !modalEl || typeof bootstrap === "undefined") return;

  var modal = new bootstrap.Modal(modalEl);
  var modalImage = document.getElementById("tanimModalImage");
  var modalTitle = document.getElementById("tanimModalLabel");
  var counter = document.getElementById("tanimModalCounter");
  var prevBtn = document.getElementById("tanimModalPrev");
  var nextBtn = document.getElementById("tanimModalNext");
  var currentIndex = 0;

  function showPage(index) {
    currentIndex = (index + thumbs.length) % thumbs.length;
    var img = thumbs[currentIndex];
    var caption = img.getAttribute("alt") || "";
    modalImage.setAttribute("src", img.getAttribute("src"));
    modalImage.setAttribute("alt", caption);
    modalTitle.textContent = caption;
    counter.textContent = currentIndex + 1 + " / " + thumbs.length;
  }

  thumbs.forEach(function (img, i) {
    img.style.cursor = "zoom-in";
    img.addEventListener("click", function () {
      showPage(i);
      modal.show();
    });
    img.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        showPage(i);
        modal.show();
      }
    });
  });

  prevBtn.addEventListener("click", function () {
    showPage(currentIndex - 1);
  });
  nextBtn.addEventListener("click", function () {
    showPage(currentIndex + 1);
  });

  modalEl.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      showPage(currentIndex - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      showPage(currentIndex + 1);
    }
  });
})();
