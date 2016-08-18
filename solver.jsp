<%@ page language="java" contentType="text/html; charset=utf-8" %>


<jsp:useBean id="solver" class="dao.CubeSolver" scope="page" />
<jsp:setProperty name="solver" property="*" />

<%
	out.print(solver.solve());
%>

