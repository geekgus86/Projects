package com.iusa.clases.interceptor;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;


import com.opensymphony.xwork2.Action;
import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.AbstractInterceptor;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionInvocation;


public class LoginInterceptor extends AbstractInterceptor 
{
	@Override
	public String intercept(ActionInvocation actionInvocation) throws Exception
	{
		String user;
		
		HttpServletRequest request = ServletActionContext.getRequest();
        HttpSession sesion = request.getSession();
        
        user=(String) sesion.getAttribute("usuario");
        
        final ActionContext context = actionInvocation.getInvocationContext();
        
        if(user == null)
        {
        	 return "login";
        }else{
        	 return actionInvocation.invoke();
        }
        
	}
	
}