package com.reffics.groupware.svc.login.controller;

import com.reffics.groupware.svc.login.model.LoginParam;
import com.reffics.groupware.svc.login.model.LoginUser;
import com.reffics.groupware.svc.login.model.UserInfo;
import com.reffics.groupware.svc.login.service.LoginService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Slf4j
@RestController
@ApiResponses({
	@ApiResponse(code = 200, message ="Success"),
	@ApiResponse(code = 400, message = "Bad Request")
})
@RequiredArgsConstructor
public class LoginController {

	private final LoginService loginService;

	@ApiOperation(value = "로그인", notes = "로그인 프로세스")
	@PostMapping(value = "/auth/login")
	public ResponseEntity<Object> login(LoginParam loginParam, HttpServletRequest request) {
		// 클라이언트로부터 서버로 요청이 들어오면 서버에서는 HttpServletRequest를 생성한다. 여기에 모든 데이터들이 들어있음
	
		log.debug("loginParam : {}", loginParam);
		
		// LoginUser는 select 해온 값을 담아두는 DTO객체 
		LoginUser loginUser = this.loginService.selectLoginUser(loginParam);
		
		// userInfo가 LoginUser하고 프로퍼티는 같지만 다른점 은 userInfo는 Serializable를 구현하여 직렬화를 하고있다
		// 왜 굳이 LoginUser가 아닌 userInfo를 새로 만드는가 하면  전송할 데이터를 바이트 단위로 변환하는 직렬화를 통해서
		// session을 사용하려면 객체를 직렬화를 해야하기 떄문이다. 
		UserInfo userInfo = new UserInfo();
		BeanUtils.copyProperties(loginUser, userInfo); // copyProperties는 원본객체 복사  loginUser -> userInfo
		userInfo.setEncPassword(""); // 암호화된 패스워드 초기화

		HttpSession httpSession = request.getSession(); // 클라이언트 세션 저장 

		httpSession.setAttribute("userInfo", userInfo); // 세션에 userInfo 등록 
		
		return ResponseEntity.ok(userInfo); // 클라이언트에게 다시 반환 
	}

	@ApiOperation(value="로그인 사용자 확인") // Swagger에서 사용하는 어노테이션으로  API에 대한 간략한 설명(제목같은 느낌으로)을 작성한다
	@GetMapping(value = "/auth/login/user")
	public ResponseEntity<Object> getUserInfo(UserInfo userInfo) { // model을 가지고 와서 컨트롤러에 연결 
		System.out.println("userinfo 모델은?? ");
		System.out.println(userInfo);
	
		return ResponseEntity.ok(userInfo); 
		// ResponseEntity 클래스란 Spring에서 제공하는 HttpEntity 클 래스로 부터 상속받은 HttpHeader와 HttpBody를 포함하는 클래스로
		// HttpStatus, HttpHeaders, HttpBody를 포함한다. 
	}

	@ApiOperation(value = "로그인 아웃", notes = "로그아웃 프로세스")                                                                   
	@GetMapping(value = "/auth/logout")
	public void logout(HttpServletRequest request) {
		HttpSession httpSession = request.getSession();
		httpSession.invalidate();
	}
}
