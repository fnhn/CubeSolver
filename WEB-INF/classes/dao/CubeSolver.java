package dao;

import cs.min2phase.Search;

public class CubeSolver {

	public CubeSolver() {
		
		
	}

	public String solve() {
		Search search = new Search();   	
       	String result = null;

       	if(cubeString != null && cubeString.length() == 54) {
       		int mask = 0;
       		result = search.solution(cubeString, 21, 1000, 0, mask);
       	}
       	else {
       		result = "error";
       	}

       	return result;

	}

	public void setCubeString(String cubeString) {
		this.cubeString = cubeString;
	}

	public String getCubeString() {
		return cubeString;
	}

	private String cubeString = null;
}