  <div>
                <h2>Đăng ký</h2>
                <form action="/register" method="post">
                    <label for="new_username">Tên đăng nhập:</label>
                    <input type="text" id="new_username" name="new_username" required><br><br>
                    <label for="new_password">Mật khẩu:</label>
                    <input type="password" id="new_password" name="new_password" required><br><br>
                    <input type="submit" value="Đăng ký">
                </form>
            </div>
            <div>
                <h2>Quên mật khẩu</h2>
                <form action="/forgot_password" method="post">
                    <label for="forgot_username">Tên đăng nhập:</label>
                    <input type="text" id="forgot_username" name="forgot_username" required><br><br>
                    <input type="submit" value="Gửi yêu cầu đặt lại mật khẩu">
                </form>
            </div>
            <div>
                <h2>Đăng nhập bằng tài khoản mạng xã hội</h2>
                <button onclick="window.location.href='/login/facebook'">Facebook</button>
                <button onclick="window.location.href='/login/google'">Google</button>
                <button onclick="window.location.href='/login/twitter'">Twitter</button>
            </div>