var editor; // use a global for the submit and return data rendering in the examples

$(document).ready(function () {
  editor = new $.fn.dataTable.Editor({
    ajax: {
      url: "https://restcountries.com/v3.1/all",
      type: "GET",
      dataSrc: "",
    },
    table: "#example",
  });

  var table = $("#example").DataTable({
    dom: "Bfrtip",
    processsing: true,
    ajax: {
      url: "https://restcountries.com/v3.1/all",
      type: "GET",
      dataSrc: "",
    },
    columns: [
      {
        className: "dt-control",
        orderable: false,
        data: null,
        defaultContent: "",
      },
      {
        data: "flags.png",
        render: function (data) {
          return '<img src="' + data + '" width="38px">';
        },
      },
      { data: "name.common" },
      { data: "capital" },
      { data: "region" },
      { data: "population.toLocaleString()" },
      { data: "cca2" },
    ],
    order: [[2, "asc"]],
    select: true,
    buttons: [
      {
        extend: "edit",
        editor: editor,
      },
      {
        extend: "collection",
        text: "Export",
        buttons: ["copy", "excel", "csv", "pdf", "print"],
      },
    ],
  });

  $("#example tbody").on("click", "tr td.dt-control", function () {
    var tr = $(this).closest("tr");
    var row = table.row(tr);

    if (row.child.isShown()) {
      row.child.hide();
      tr.removeClass("shown");
    } else {
      row.child(format(row.data())).show();
      tr.addClass("shown");
    }
  });
});

function format(d) {
  return (
    '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
    "<tr>" +
    "<td> Official Name: </td>" +
    "<td>" +
    d.name.official +
    "</td>" +
    "</tr>" +
    "<tr>" +
    "<td> Capital: </td>" +
    "<td>" +
    d.capital +
    "<td>" +
    "</tr>" +
    "<td> Sub Region: </td>" +
    "<td>" +
    d.subregion +
    "<td>" +
    "</tr>" +
    "<td> Population: </td>" +
    "<td>" +
    d.population +
    "<td>" +
    "</tr>" +
    "<td> Borders: </td>" +
    "<td>" +
    d.borders +
    "<td>" +
    "</tr>" +
    "</table>"
  );
}
