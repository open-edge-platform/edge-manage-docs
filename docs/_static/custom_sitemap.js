// Custom interactive sitemap JS for Sphinx
// Simple collapsible tree for sitemap page

document.addEventListener('DOMContentLoaded', function() {
  var togglers = document.querySelectorAll('.sitemap-toggle');
  togglers.forEach(function(toggler) {
    toggler.addEventListener('click', function() {
      var target = document.getElementById(this.dataset.target);
      if (target.style.display === 'none') {
        target.style.display = 'block';
        this.textContent = '▼';
      } else {
        target.style.display = 'none';
        this.textContent = '▶';
      }
    });
  });
});
