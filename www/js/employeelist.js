var serviceURL = "http://www.haageninternet.nl/klanten/api/";

var employees;

$('#employeeListPage').bind('pageinit', function(event) {
	getEmployeeList();
});

function getEmployeeList() {
	$.getJSON(serviceURL + 'getemployees.php', function(data) {
		$('#employeeList li').remove();
		employees = data.items;
		$.each(employees, function(index, employee) {
			$('#employeeList').append('<li><a href="employeedetails.html?id=' + employee.ArtikelID + '">' +
					'<img src="pics/' + employee.aAfbeelding + '"/>' +
					'<h4>' + employee.aNaam + '</h4>' +
					'<span class="ui-li-count">' + employee.Aantal + '</span></a></li>');
		});
		$('#employeeList').listview('refresh');
	});
}
