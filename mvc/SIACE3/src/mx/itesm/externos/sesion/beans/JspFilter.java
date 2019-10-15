package mx.itesm.externos.sesion.beans;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

public class JspFilter implements Filter{
	  public void  doFilter(ServletRequest request, ServletResponse response,                
	           FilterChain chain) throws ServletException, IOException {
	    HttpServletRequest req= (HttpServletRequest) request;
	    	System.out.println("Trato de acceder por medio de URL, intento de intrusion ");
	    	req.getRequestDispatcher("deny.jsp").forward(request,response);
	  }

	@Override
	public void destroy() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {
		// TODO Auto-generated method stub
		
	}
}
