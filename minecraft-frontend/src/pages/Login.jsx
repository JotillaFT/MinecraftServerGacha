import React, { useState } from 'react';
import { Button, Form, Input, Typography, Card } from 'antd';
import { UserOutlined, LockOutlined, SafetyOutlined } from '@ant-design/icons';
import '../css/Banner.css';
import { sendAuthMessage, sendAuthCode, sendLogin } from '../logic/AuthController';
import { useNavigate, Navigate } from "react-router-dom";
import Cookies from 'js-cookie';
const { Title, Text } = Typography;
import toast, { Toaster } from 'react-hot-toast';



const onFinishFailedLogin = errorInfo => {
  console.log('Login Failed:', errorInfo);
};




export default function Auth() {
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();
  const session = Cookies.get("access_token");
  var notifyAuth = () => toast.success('Auth Succesfully');
  const notifyAuthError = () => toast.error('Error al intentar autenticarte')
  const notifyMinecraftMessage = () => toast.success('Acabamos de enviarte el codigo de autenticacion a tu usuario de Minecraft en el servidor.')

  if (session) {
    return <Navigate to="/user" replace></Navigate>
  }

  const onFinishLogin = async values => {
    try {
      const response = await sendLogin(values.username, values.password);
      if (response.status === "success" && response.access_token) {
        notifyAuth()
        Cookies.set('access_token', response.access_token, { expires: 30, path: '/', secure: true, sameSite: 'strict' });
        navigate('/user');
      }
    } catch (error) {
      notifyAuthError()
    }
  };

  const onCompleteNormalRegister = async values => {
    // Este es el registro basico, aqui se mandara un codido de verificacion al servidor.
    try {
      notifyMinecraftMessage()
      const response = await sendAuthMessage(values.username, values.password);
      setUsername(values.username);
    } catch (error) {
      notifyAuthError()
    }
  };

  const onFinishFailedRegister = errorInfo => {
    console.log('Register Failed:', errorInfo);
  };

  const onFinishAuth = async (values) => {
    try {
      const response = await sendAuthCode(username, values.code);
      if (response.status === "success" && response.access_token) {
        notifyAuth()
        Cookies.set('access_token', response.access_token, { expires: 30, path: '/', secure: true, sameSite: 'strict' });
        navigate('/user');
      }
    } catch (error) {
      notifyAuthError()
    }
  };

  return (
    <div
      style={{
        minHeight: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Toaster /> 
      <div
        style={{
          display: 'flex',
          gap: 40,
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {/* Login Card */}
        <Card
          style={{
            width: 380,
            borderRadius: 16,
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
            padding: '32px 24px',
            background: '#fff',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <Title level={2} style={{ color: '#F05454', marginBottom: 0 }}>
              Iniciar Sesión
            </Title>
            <Text type="secondary" style={{ fontSize: 16 }}>
              ¡Bienvenido de nuevo! Ingresa tus credenciales.
            </Text>
          </div>
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinishLogin}
            onFinishFailed={onFinishFailedLogin}
            layout="vertical"
          >
            <Form.Item
              label="Usuario"
              name="username"
              rules={[{ required: true, message: 'Por favor, ingresa tu usuario' }]}
            >
              <Input
                prefix={<UserOutlined style={{ color: '#30475E' }} />}
                placeholder="Usuario"
                size="large"
              />
            </Form.Item>

            <Form.Item
              label="Contraseña"
              name="password"
              rules={[{ required: true, message: 'Por favor, ingresa tu contraseña' }]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: '#30475E' }} />}
                placeholder="Contraseña"
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                size="large"
                style={{
                  background: '#F05454',
                  borderColor: '#F05454',
                  fontWeight: 'bold',
                }}
              >
                Entrar
              </Button>
            </Form.Item>
          </Form>
        </Card>

        {/* Register Card */}
        <Card
          style={{
            width: 380,
            borderRadius: 16,
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
            padding: '32px 24px',
            background: '#fff',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <Title level={2} style={{ color: '#30475E', marginBottom: 0 }}>
              Registrarse
            </Title>
            <Text type="secondary" style={{ fontSize: 16 }}>
              ¡Crea tu cuenta gratis!
            </Text>
          </div>
          <Form
            name="register"
            onFinish={onCompleteNormalRegister}
            onFinishFailed={onFinishFailedRegister}
            layout="vertical"
          >
            <Form.Item
              label="Usuario"
              name="username"
              rules={[{ required: true, message: 'Por favor, elige un usuario' }]}
            >
              <Input
                prefix={<UserOutlined style={{ color: '#30475E' }} />}
                placeholder="Usuario"
                size="large"
              />
            </Form.Item>
            <Form.Item
              label="Contraseña"
              name="password"
              rules={[{ required: true, message: 'Por favor, elige una contraseña' }]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: '#30475E' }} />}
                placeholder="Contraseña"
                size="large"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                size="large"
                style={{
                  background: '#30475E',
                  borderColor: '#30475E',
                  fontWeight: 'bold',
                }}
              >
                Pedir Codigo Minecraft
              </Button>
            </Form.Item>
            
          </Form>
          <Form
            name="register-code"
            onFinish={onFinishAuth}
            onFinishFailed={onFinishFailedRegister}
            layout="vertical"
          >
            <Form.Item
              label="Minecraft Code"
              name="code"
              rules={[
                { required: true, message: 'Por favor, pon el codigo que a llega al servidor de Minecraft' },
                { type: 'code', message: 'El codigo no es válido' },
              ]}
            >
              <Input
                prefix={<SafetyOutlined style={{ color: '#30475E' }} />}
                placeholder="Minecraft Code"
                size="large"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                size="large"
                style={{
                  background: '#30475E',
                  borderColor: '#30475E',
                  fontWeight: 'bold',
                }}
              >
                Crear cuenta
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
}
